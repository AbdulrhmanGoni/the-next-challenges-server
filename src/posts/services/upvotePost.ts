import { Model, Types } from 'mongoose';
import { Post } from '../schemas/post.schema';
import { InternalServerErrorException } from '@nestjs/common';

export default async function upvotePost(
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
                else: {
                  voters: {
                    $concatArrays: ['$upvotes.voters', [userId]],
                  },
                  totalVotes: {
                    $sum: ['$upvotes.totalVotes', 1],
                  },
                },
              },
            },
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
                else: '$downvotes',
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
