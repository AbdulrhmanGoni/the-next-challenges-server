import { Model, Types } from 'mongoose';
import { Post } from '../schemas/post.schema';
import { InternalServerErrorException } from '@nestjs/common';
import setVoteQuery from '../../global/utils/setVoteQuery';

export default async function upvotePost(
  postId: Types.ObjectId,
  userId: Types.ObjectId,
) {
  const PostModel = this.PostModel as Model<Post>;

  try {
    const { acknowledged, modifiedCount } = await PostModel.updateOne(
      { _id: postId },
      [setVoteQuery('upvote', userId)],
    );

    return acknowledged && !!modifiedCount;
  } catch {
    throw new InternalServerErrorException();
  }
}
