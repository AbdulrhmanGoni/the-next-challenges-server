import { Model, Types } from 'mongoose';
import { User } from '../schemas/user.schema';

export default async function findUserById(userId: Types.ObjectId) {
  const UserModel = this.UserModel as Model<User>;
  return await UserModel.findById(userId);
}
