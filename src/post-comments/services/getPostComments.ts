import { Model, Types } from 'mongoose';
import { PostsComments } from '../schemas/posts-comments.schema';
import { InternalServerErrorException } from '@nestjs/common';
import { PaginationOptions } from '../../global/dto/pagination-options.dto';
import preparePaginationOptions from '../../global/utils/preparePaginationOptions';
import { PostCommentsPaginationResponse } from '../dto/comments-pagination-response.type';

export default async function getPostComments(
  postId: Types.ObjectId,
  pagination: PaginationOptions,
): Promise<PostCommentsPaginationResponse> {
  try {
    const PostCommentsModel = this.PostCommentsModel as Model<PostsComments>;

    const { limit, skip } = preparePaginationOptions(pagination);
    const result = await PostCommentsModel.aggregate([
      {
        $facet: {
          commentsPipeline: [
            { $match: { _id: postId } },
            {
              $project: {
                _id: false,
                comments: {
                  $map: {
                    input: { $slice: ['$comments', skip, limit] },
                    as: 'comment',
                    in: {
                      id: '$$comment.id',
                      comment: '$$comment.comment',
                      commenterId: '$$comment.commenterId',
                      createdAt: '$$comment.createdAt',
                      upvotes: '$$comment.upvotes.totalVotes',
                      downvotes: '$$comment.downvotes.totalVotes',
                    },
                  },
                },
              },
            },
            { $unwind: '$comments' },
            { $replaceRoot: { newRoot: '$comments' } },
            {
              $lookup: {
                as: 'ownerData',
                from: 'users',
                foreignField: '_id',
                localField: 'commenterId',
                pipeline: [
                  {
                    $project: {
                      firstName: 1,
                      lastName: 1,
                      headline: 1,
                      avatar: 1,
                    },
                  },
                ],
              },
            },
            {
              $set: {
                owner: { $arrayElemAt: ['$ownerData', 0] },
              },
            },
          ],
          areThereMoreCommentsPipeline: [
            { $match: { _id: postId } },
            {
              $project: {
                _id: false,
                answer: {
                  $eq: [
                    {
                      $toBool: {
                        $arrayElemAt: ['$comments', skip + limit],
                      },
                    },
                    true,
                  ],
                },
              },
            },
          ],
        },
      },
      {
        $project: {
          areThereMore: {
            $getField: {
              field: 'answer',
              input: { $arrayElemAt: ['$areThereMoreCommentsPipeline', 0] },
            },
          },
          comments: '$commentsPipeline',
        },
      },
    ]);

    if (result[0]) {
      return result[0] as PostCommentsPaginationResponse;
    }
    return {
      comments: [],
      areThereMore: false,
    };
  } catch {
    throw new InternalServerErrorException();
  }
}
