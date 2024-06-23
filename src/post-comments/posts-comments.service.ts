import { Injectable } from '@nestjs/common';
import {
  addCommentToPost,
  getPostComments,
  removeCommentFromPost,
  upvotePostComment,
  downvotePostComment,
} from './services';
import { Model } from 'mongoose';
import { PostsComments } from './schemas/posts-comments.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PostsCommentsService {
  constructor(
    @InjectModel(PostsComments.name)
    private PostCommentsModel: Model<PostsComments>,
  ) {}

  addCommentToPost = addCommentToPost;

  getPostComments = getPostComments;

  removeCommentFromPost = removeCommentFromPost;

  upvotePostComment = upvotePostComment;

  downvotePostComment = downvotePostComment;
}
