import { Model, Types } from 'mongoose';
import { Post } from '../schemas/post.schema';

export default async function findPostById(postId: Types.ObjectId) {
  const PostModel = this.PostModel as Model<Post>;
  return await PostModel.findById(postId);
}
