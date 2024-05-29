import { Model, Types } from 'mongoose';
import { UpdatePostOptions } from '../dto/update-post.input';
import { Post } from '../schemas/post.schema';
import { InternalServerErrorException } from '@nestjs/common';

export default async function updatePost(
  postId: Types.ObjectId,
  authorId: Types.ObjectId,
  updateOptions: UpdatePostOptions,
) {
  try {
    const PostModel = this.PostModel as Model<Post>;
    const { acknowledged, modifiedCount } = await PostModel.updateOne(
      { _id: postId, authorId },
      { $set: updateOptions },
    );

    return acknowledged && !!modifiedCount;
  } catch {
    throw new InternalServerErrorException();
  }
}
