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
          isThereMore: {
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
    ]);

    if (result[0]) {
      return result[0] as PostCommentsPaginationResponse;
    }
    return {
      comments: [],
      isThereMore: false,
    };
  } catch {
    throw new InternalServerErrorException();
  }
}
