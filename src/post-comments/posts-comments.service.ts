import { Injectable } from '@nestjs/common';
import {
  addCommentToPost,
  getPostComments,
  removeCommentFromPost,
  upvotePostComment,
  downvotePostComment,
} from './services';
import { Connection, Model } from 'mongoose';
import { PostsComments } from './schemas/posts-comments.schema';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { PostsService } from '../posts/posts.service';

@Injectable()
export class PostsCommentsService {
  constructor(
    @InjectModel(PostsComments.name)
    private PostCommentsModel: Model<PostsComments>,
    private PostsService: PostsService,
    @InjectConnection() private connection: Connection,
  ) {}

  addCommentToPost = addCommentToPost;

  getPostComments = getPostComments;

  removeCommentFromPost = removeCommentFromPost;

  upvotePostComment = upvotePostComment;

  downvotePostComment = downvotePostComment;
}
