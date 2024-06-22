import { Model, Types } from 'mongoose';
import { PostsComments, PostComment } from '../schemas/posts-comments.schema';
import { InternalServerErrorException } from '@nestjs/common';

export default async function addCommentToPost(
  postId: Types.ObjectId,
  comment: string,
  userId: Types.ObjectId,
) {
  try {
    const PostCommentsModel = this.PostCommentsModel as Model<PostsComments>;

    const newComment = new PostComment();
    newComment.commenterId = userId;
    newComment.id = new Types.ObjectId();
    newComment.comment = comment;

    const { acknowledged, matchedCount, modifiedCount } =
      await PostCommentsModel.updateOne(
        { _id: postId },
        { $push: { comments: newComment } },
      );

    if (!matchedCount) {
      return await PostCommentsModel.create({
        comments: [newComment],
        _id: postId,
      }).then(() => true);
    }

    return acknowledged && !!modifiedCount;
  } catch {
    throw new InternalServerErrorException();
  }
}
