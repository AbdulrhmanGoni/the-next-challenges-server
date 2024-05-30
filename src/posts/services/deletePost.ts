import { Model, Types } from 'mongoose';
import { Post } from '../schemas/post.schema';
import { InternalServerErrorException } from '@nestjs/common';

export default async function deletePost(
  postId: Types.ObjectId,
  authorId: Types.ObjectId,
) {
  try {
    const PostModel = this.PostModel as Model<Post>;
    const { acknowledged, deletedCount } = await PostModel.deleteOne({
      _id: postId,
      authorId,
    });

    return acknowledged && !!deletedCount;
  } catch {
    throw new InternalServerErrorException();
  }
}
