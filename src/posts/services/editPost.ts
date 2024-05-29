import { Model, Types } from 'mongoose';
import { EditPostOptions } from '../dto/update-post.input';
import { Post } from '../schemas/post.schema';
import { InternalServerErrorException } from '@nestjs/common';

export default async function editPost(
  postId: Types.ObjectId,
  authorId: Types.ObjectId,
  updateOptions: EditPostOptions,
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
