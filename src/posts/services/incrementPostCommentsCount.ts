import { InternalServerErrorException } from '@nestjs/common';
import { Post } from '../schemas/post.schema';
import { ClientSession, Model, Types } from 'mongoose';

export default async function incrementPostCommentsCount(
  postId: Types.ObjectId,
  session: ClientSession,
) {
  try {
    const PostModel = this.PostModel as Model<Post>;

    const { acknowledged, modifiedCount } = await PostModel.updateOne(
      { _id: postId },
      { $inc: { commentsCount: 1 } },
      { session },
    );

    return acknowledged && !!modifiedCount;
  } catch (error) {
    throw new InternalServerErrorException();
  }
}
