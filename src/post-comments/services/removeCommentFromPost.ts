import { Model, Types } from 'mongoose';
import { PostsComments } from '../schemas/posts-comments.schema';
import { InternalServerErrorException } from '@nestjs/common';
import createTransactionSession from '../../global/utils/createTransactionSession';
import { PostsService } from '../../posts/posts.service';

export default async function removeCommentFromPost(
  postId: Types.ObjectId,
  commentId: Types.ObjectId,
  userId: Types.ObjectId,
) {
  try {
    const session = await createTransactionSession.bind(this)();

    const PostCommentsModel = this.PostCommentsModel as Model<PostsComments>;
    const PostsService = this.PostsService as PostsService;

    const { acknowledged, modifiedCount } = await PostCommentsModel.updateOne(
      { _id: postId },
      {
        $pull: {
          comments: {
            id: commentId,
            commenterId: userId,
          },
        },
      },
      { session },
    );

    if (
      acknowledged &&
      modifiedCount &&
      (await PostsService.incrementPostCommentsCount(postId, session, true))
    ) {
      return await session.commitTransaction().then(() => true);
    } else {
      await session.abortTransaction();
    }

    return false;
  } catch {
    throw new InternalServerErrorException();
  }
}
