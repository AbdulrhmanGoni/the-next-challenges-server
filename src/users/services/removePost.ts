import { ClientSession, Model, Types } from 'mongoose';
import { User } from '../schemas/user.schema';

export default async function removePost(
  userId: Types.ObjectId,
  postId: Types.ObjectId,
  options?: { session?: ClientSession },
) {
  const UserModel = this.UserModel as Model<User>;
  const { acknowledged, modifiedCount } = await UserModel.updateOne(
    { _id: userId },
    { $pull: { posts: postId } },
    options,
  );

  return acknowledged && !!modifiedCount;
}
