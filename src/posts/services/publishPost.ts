import { Model, Types } from 'mongoose';
import { CreatePostInput } from '../dto/create-post.input';
import { Post } from '../schemas/post.schema';
import { InternalServerErrorException } from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import createTransactionSession from '../../global/utils/createTransactionSession';

export default async function publishPost(
  post: CreatePostInput,
  userId: Types.ObjectId,
) {
  const PostModel = this.PostModel as Model<Post>;
  const usersService = this.UsersService as UsersService;

  const session = await createTransactionSession.bind(this)();

  try {
    const newPost = new PostModel({ ...post, authorId: userId });
    const newPostId = (await newPost.save({ session }))._id;

    const postAdded = await usersService.addPost(userId, newPostId, {
      session,
    });

    if (postAdded) {
      await session.commitTransaction();
    }

    return postAdded;
  } catch {
    await session.abortTransaction();
    throw new InternalServerErrorException();
  }
}
