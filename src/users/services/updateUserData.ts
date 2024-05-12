import { UpdateUserDataInput } from '../dto/update-data-user.input';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';

export default async function updateUserData(updateInput: UpdateUserDataInput) {
  const UserModel = this.UserModel as Model<User>;
}
