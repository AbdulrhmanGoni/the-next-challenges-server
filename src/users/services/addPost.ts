import { Model, Types } from 'mongoose';
import { User } from '../schemas/user.schema';

export default async function addPost(
  userId: Types.ObjectId,
  postId: Types.ObjectId,
) {
  const UserModel = this.UserModel as Model<User>;

  const { acknowledged, modifiedCount } = await UserModel.updateOne(
    { _id: userId },
    { $push: { posts: postId } },
  );

  return acknowledged && !!modifiedCount;
}
