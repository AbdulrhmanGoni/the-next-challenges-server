import { PaginationOptions } from 'src/global-dto/pagination-options.dto';
import { SearchForUserInput } from '../dto/search-for-users.input';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';

export default async function findUsers(
  searchQuery?: SearchForUserInput,
  options?: PaginationOptions,
) {
  const UserModel = this.UserModel as Model<User>;
  return await UserModel.find();
}
