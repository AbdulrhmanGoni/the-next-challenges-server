import { Model, Types } from 'mongoose';
import { PostsComments } from '../schemas/posts-comments.schema';
import { InternalServerErrorException } from '@nestjs/common';

export default async function removeCommentFromPost(
  postId: Types.ObjectId,
  commentId: Types.ObjectId,
  userId: Types.ObjectId,
) {
  try {
    const PostCommentsModel = this.PostCommentsModel as Model<PostsComments>;

    const { acknowledged, modifiedCount } = await PostCommentsModel.updateOne(
      { _id: postId },
      { $pull: { comments: { id: commentId, commenterId: userId } } },
    );

    return acknowledged && !!modifiedCount;
  } catch {
    throw new InternalServerErrorException();
  }
}
