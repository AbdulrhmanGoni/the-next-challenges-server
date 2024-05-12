import { Model } from 'mongoose';
import { CreatePostInput } from '../dto/create-post.input';
import { Post } from '../schemas/post.schema';

export default async function createPost(post: CreatePostInput) {
  const PostModel = this.PostModel as Model<Post>;
}
