import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Post } from './schemas/post.schema';
import { Connection, Model } from 'mongoose';
import {
  publishPost,
  findPostById,
  findPosts,
  editPost,
  deletePost,
  upvotePost,
  downvotePost,
  incrementPostCommentsCount,
} from './services';
import { UsersService } from '../users/users.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private PostModel: Model<Post>,
    private UsersService: UsersService,
    @InjectConnection() private connection: Connection,
  ) {}

  publishPost = publishPost;

  findPosts = findPosts;

  findPostById = findPostById;

  editPost = editPost;

  deletePost = deletePost;

  upvotePost = upvotePost;

  downvotePost = downvotePost;

  incrementPostCommentsCount = incrementPostCommentsCount;
}
