import { Model, Types } from 'mongoose';
import { Post } from '../schemas/post.schema';
import { InternalServerErrorException } from '@nestjs/common';
import createTransactionSession from '../../global/utils/createTransactionSession';
import { UsersService } from '../../users/users.service';

export default async function deletePost(
  postId: Types.ObjectId,
  authorId: Types.ObjectId,
) {
  const session = await createTransactionSession.bind(this)();
  try {
    const PostModel = this.PostModel as Model<Post>;
    const usersService = this.UsersService as UsersService;
    const { acknowledged, deletedCount } = await PostModel.deleteOne(
      { _id: postId, authorId },
      { session },
    );

    if (acknowledged && !!deletedCount) {
      const removingResult = await usersService.removePost(authorId, postId, {
        session,
      });
      if (removingResult) {
        await session.commitTransaction();
        return true;
      }
    } else {
      await session.abortTransaction();
      return false;
    }
  } catch {
    await session.abortTransaction();
    throw new InternalServerErrorException();
  }
}
