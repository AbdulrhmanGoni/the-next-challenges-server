import { Model } from 'mongoose';
import { UpdatePostInput } from '../dto/update-post.input';
import { Post } from '../schemas/post.schema';

export default async function updatePost(updatePostInput: UpdatePostInput) {
  const PostModel = this.PostModel as Model<Post>;
}
