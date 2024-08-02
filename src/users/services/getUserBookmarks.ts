import { Model, Types } from 'mongoose';
import { PaginationOptions } from '../../global/dto/pagination-options.dto';
import { User } from '../schemas/user.schema';
import preparePaginationOptions from '../../global/utils/preparePaginationOptions';
import { InternalServerErrorException } from '@nestjs/common';
import { UserBookmarksPaginationResponse } from '../dto/user-bookmarks-pagination-response.type';

export default async function getUserBookmarks(
  userId: Types.ObjectId,
  paginationOptions: PaginationOptions,
): Promise<UserBookmarksPaginationResponse> {
  try {
    const UserModel = this.UserModel as Model<User>;
    const { skip, limit } = preparePaginationOptions(paginationOptions);
    const [result] = await UserModel.aggregate([
      { $match: { _id: userId } },
      {
        $lookup: {
          as: 'bookmarkedPosts',
          from: 'posts',
          let: { postsIds: { $slice: ['$bookmarks', skip, limit] } },
          pipeline: [
            { $match: { $expr: { $in: ['$_id', '$$postsIds'] } } },
            { $set: { id: '$_id' } },
            { $project: { _id: false } },
          ],
        },
      },
      {
        $project: {
          _id: false,
          posts: '$bookmarkedPosts',
          areThereMorePosts: {
            $eq: [
              {
                $toBool: {
                  $arrayElemAt: ['$bookmarks', skip + limit],
                },
              },
              true,
            ],
          },
        },
      },
    ]);

    return {
      areThereMore: !!result?.areThereMorePosts,
      posts: result?.posts || [],
    };
  } catch {
    throw new InternalServerErrorException();
  }
}
