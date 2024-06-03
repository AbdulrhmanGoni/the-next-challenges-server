import { Model, Types } from 'mongoose';
import { Post } from '../schemas/post.schema';
import { InternalServerErrorException } from '@nestjs/common';

export default async function downvotePost(
  postId: Types.ObjectId,
  userId: Types.ObjectId,
) {
  const PostModel = this.PostModel as Model<Post>;

  try {
    const { acknowledged, modifiedCount } = await PostModel.updateOne(
      { _id: postId },
      [
        {
          $set: {
            downvotes: {
              $cond: {
                if: { $in: [userId, '$downvotes.voters'] },
                then: {
                  voters: {
                    $filter: {
                      input: '$downvotes.voters',
                      as: 'voterId',
                      cond: { $ne: [userId, '$$voterId'] },
                    },
                  },
                  totalVotes: {
                    $sum: ['$downvotes.totalVotes', -1],
                  },
                },
                else: {
                  voters: {
                    $concatArrays: ['$downvotes.voters', [userId]],
                  },
                  totalVotes: {
                    $sum: ['$downvotes.totalVotes', 1],
                  },
                },
              },
            },
            upvotes: {
              $cond: {
                if: { $in: [userId, '$upvotes.voters'] },
                then: {
                  voters: {
                    $filter: {
                      input: '$upvotes.voters',
                      as: 'voterId',
                      cond: { $ne: [userId, '$$voterId'] },
                    },
                  },
                  totalVotes: {
                    $sum: ['$upvotes.totalVotes', -1],
                  },
                },
                else: '$upvotes',
              },
            },
          },
        },
      ],
    );

    return acknowledged && !!modifiedCount;
  } catch {
    throw new InternalServerErrorException();
  }
}
