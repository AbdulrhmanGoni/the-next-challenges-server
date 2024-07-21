import { InternalServerErrorException } from '@nestjs/common';
import { Post } from '../schemas/post.schema';
import { ClientSession, Model, Types } from 'mongoose';

export default async function incrementPostCommentsCount(
  postId: Types.ObjectId,
  session: ClientSession,
  decrement?: boolean,
) {
  try {
    const PostModel = this.PostModel as Model<Post>;

    const { acknowledged, modifiedCount } = await PostModel.updateOne(
      { _id: postId },
      { $inc: { commentsCount: decrement ? -1 : 1 } },
      { session },
    );

    return acknowledged && !!modifiedCount;
  } catch {
    throw new InternalServerErrorException();
  }
}
