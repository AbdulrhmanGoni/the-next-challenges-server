import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Post } from './schemas/post.schema';
import { Connection, Model } from 'mongoose';
import { createPost, findPostById, findPosts, editPost } from './services';
import { UsersService } from '../users/users.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private PostModel: Model<Post>,
    private UsersService: UsersService,
    @InjectConnection() private connection: Connection,
  ) {}

  createPost = createPost;

  findPosts = findPosts;

  findPostById = findPostById;

  editPost = editPost;
}
