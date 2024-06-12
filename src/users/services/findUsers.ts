import { PaginationOptions } from '../../global/dto/pagination-options.dto';
import { SearchForUserInput } from '../dto/search-for-users.input';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';

export default async function findUsers(
  searchQuery?: SearchForUserInput,
  options?: PaginationOptions,
) {
  const UserModel = this.UserModel as Model<User>;

  const limit = options?.pageSize || 2;
  const skip = ((options?.page || 1) - 1) * limit;

  return await UserModel.find({}, {}, { limit, skip });
}
