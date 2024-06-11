import { Model, Types } from 'mongoose';
import { PaginationOptions } from '../../global-dto/pagination-options.dto';
import { User } from '../schemas/user.schema';
import preparePaginationOptions from '../../global/utils/preparePaginationOptions';
import { InternalServerErrorException } from '@nestjs/common';

export default async function getUserBookmarks(
  userId: Types.ObjectId,
  paginationOptions: PaginationOptions,
) {
  try {
    const UserModel = this.UserModel as Model<User>;
    const { skip, limit } = preparePaginationOptions(paginationOptions);
    const bookmarkedPosts = await UserModel.aggregate([
      { $match: { _id: userId } },
      {
        $lookup: {
          as: 'bookmarkedPosts',
          from: 'posts',
          let: { postsIds: { $slice: ['$bookmarks', skip, limit] } },
          pipeline: [
            {
              $match: {
                $expr: { $in: ['$_id', '$$postsIds'] },
              },
            },
          ],
        },
      },
      { $unwind: '$bookmarkedPosts' },
      { $replaceRoot: { newRoot: '$bookmarkedPosts' } },
    ]);

    return bookmarkedPosts;
  } catch {
    throw new InternalServerErrorException();
  }
}
