import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from './schemas/post.schema';
import { Model } from 'mongoose';
import { createPost, findPostById, findPosts, updatePost } from './services';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private PostModel: Model<Post>) {}

  createPost = createPost;

  findPosts = findPosts;

  findPostById = findPostById;

  updatePost = updatePost;
}
