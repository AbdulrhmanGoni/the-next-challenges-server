import { UpdateUserDataInput } from '../dto/update-data-user.input';
import { Model, Types } from 'mongoose';
import { User } from '../schemas/user.schema';
import { InternalServerErrorException } from '@nestjs/common';

export default async function updateUserData(
  userId: Types.ObjectId,
  updateInput: UpdateUserDataInput,
) {
  try {
    const UserModel = this.UserModel as Model<User>;
    const { acknowledged, modifiedCount } = await UserModel.updateOne(
      { _id: userId },
      { $set: updateInput },
    );
    return acknowledged && !!modifiedCount;
  } catch {
    throw new InternalServerErrorException();
  }
}
