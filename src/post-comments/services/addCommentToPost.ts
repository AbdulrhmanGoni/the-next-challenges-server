import { Model, Types } from 'mongoose';
import { PostsComments, PostComment } from '../schemas/posts-comments.schema';
import { InternalServerErrorException } from '@nestjs/common';
import createTransactionSession from '../../global/utils/createTransactionSession';
import { PostsService } from '../../posts/posts.service';

export default async function addCommentToPost(
  postId: Types.ObjectId,
  comment: string,
  userId: Types.ObjectId,
) {
  try {
    const PostCommentsModel = this.PostCommentsModel as Model<PostsComments>;
    const PostsService = this.PostsService as PostsService;

    const session = await createTransactionSession.bind(this)();

    const newComment = new PostComment();
    newComment.commenterId = userId;
    newComment.id = new Types.ObjectId();
    newComment.comment = comment;

    let commentAddedSuccessfully = false;

    const postCommentsUpdate = await PostCommentsModel.updateOne(
      { _id: postId },
      { $push: { comments: newComment } },
      { session },
    );

    commentAddedSuccessfully =
      postCommentsUpdate.acknowledged && !!postCommentsUpdate.modifiedCount;

    if (!postCommentsUpdate.matchedCount) {
      commentAddedSuccessfully = await PostCommentsModel.create(
        [
          {
            comments: [newComment],
            _id: postId,
          },
        ],
        { session },
      ).then(() => true);
    }

    if (
      commentAddedSuccessfully &&
      (await PostsService.incrementPostCommentsCount(postId, session))
    ) {
      return await session.commitTransaction().then(() => newComment.id);
    } else {
      await session.abortTransaction();
    }
  } catch {
    throw new InternalServerErrorException();
  }
}
