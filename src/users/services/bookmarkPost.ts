import { ClientSession, Model, Types } from 'mongoose';
import { User } from '../schemas/user.schema';

export default async function bookmarkPost(
  userId: Types.ObjectId,
  postId: Types.ObjectId,
  options?: { session?: ClientSession },
) {
  const UserModel = this.UserModel as Model<User>;

  const { acknowledged, modifiedCount } = await UserModel.updateOne(
    { _id: userId },
    [
      {
        $set: {
          bookmarks: {
            $cond: {
              if: { $in: [postId, '$bookmarks'] },
              then: {
                $filter: {
                  input: '$bookmarks',
                  as: 'postId',
                  cond: { $ne: [postId, '$$postId'] },
                },
              },
              else: { $concatArrays: ['$bookmarks', [postId]] },
            },
          },
        },
      },
    ],
    options,
  );

  return acknowledged && !!modifiedCount;
}
