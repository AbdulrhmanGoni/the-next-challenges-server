import { Model } from 'mongoose';
import { SignUpUserInput } from '../dto/create-user.input';
import { User } from '../schemas/user.schema';

export default async function signUpUser(user: SignUpUserInput) {
  const UserModel = this.UserModel as Model<User>;
}
