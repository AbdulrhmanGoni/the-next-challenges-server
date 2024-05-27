import { ClientSession, Connection, Model, Types } from 'mongoose';
import { CreatePostInput } from '../dto/create-post.input';
import { Post } from '../schemas/post.schema';
import { InternalServerErrorException } from '@nestjs/common';
import { UsersService } from '../../users/users.service';

export default async function createPost(
  post: CreatePostInput,
  userId: Types.ObjectId,
) {
  const PostModel = this.PostModel as Model<Post>;
  const usersService = this.UsersService as UsersService;
  const mongodbConnection = this.connection as Connection;

  let session: ClientSession;
  try {
    session = await mongodbConnection.startSession();
    session.startTransaction();
  } catch {
    throw new InternalServerErrorException();
  }

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
