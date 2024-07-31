import preparePaginationOptions from 'src/global/utils/preparePaginationOptions';
import { PaginationOptions } from '../../global/dto/pagination-options.dto';
import { UserFeedsPaginationResponse } from '../dto/user-feeds-pagination-response.type';
import { Post } from '../schemas/post.schema';
import { Model, Types } from 'mongoose';
import { InternalServerErrorException } from '@nestjs/common';

export default async function getUserFeeds(
  userId: Types.ObjectId,
  pagination: PaginationOptions,
): Promise<UserFeedsPaginationResponse> {
  const PostModel = this.PostModel as Model<Post>;

  const { limit, skip } = preparePaginationOptions(pagination);
  try {
    const result = await PostModel.aggregate([
      {
        $facet: {
          posts: [{ $skip: skip }, { $limit: limit }, { $set: { id: '$_id' } }],
          areThereMorePipeline: [{ $skip: skip + limit }, { $limit: 1 }],
        },
      },
      {
        $set: {
          areThereMore: {
            $eq: [
              {
                $toBool: {
                  $arrayElemAt: ['$areThereMorePipeline', 0],
                },
              },
              true,
            ],
          },
        },
      },
    ]);

    return result[0];
  } catch {
    throw new InternalServerErrorException();
  }
}
