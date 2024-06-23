import { CurrentUser, GqlJwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { Types } from 'mongoose';
import { UseGuards } from '@nestjs/common';
import { MongoObjectIdScalar } from '../global/dto/mongoObjectId.scalar';
import { AuthorizedUser } from '../auth/dto/auth-related.dto';
import { PostsCommentsService } from './posts-comments.service';
import { PostsComments } from './schemas/posts-comments.schema';
import { PostComment } from './dto/comment.type';
import { PaginationOptions } from '../global/dto/pagination-options.dto';

@Resolver(() => PostsComments)
@UseGuards(GqlJwtAuthGuard)
export class PostsCommentsResolver {
  constructor(private PostsCommentsService: PostsCommentsService) {}

  @Mutation(() => Boolean)
  async addCommentToPost(
    @Args('postId', { type: () => MongoObjectIdScalar }) postId: Types.ObjectId,
    @Args('comment') comment: string,
    @CurrentUser() user: AuthorizedUser,
  ) {
    return await this.PostsCommentsService.addCommentToPost(
      postId,
      comment,
      user.id,
    );
  }

  @Mutation(() => Boolean)
  async removeCommentFromPost(
    @Args('postId', { type: () => MongoObjectIdScalar }) postId: Types.ObjectId,
    @Args('commentId', { type: () => MongoObjectIdScalar })
    commentId: Types.ObjectId,
    @CurrentUser() user: AuthorizedUser,
  ) {
    return await this.PostsCommentsService.removeCommentFromPost(
      postId,
      commentId,
      user.id,
    );
  }

  @Query(() => [PostComment])
  async getPostComments(
    @Args('postId', { type: () => MongoObjectIdScalar }) postId: Types.ObjectId,
    @Args('paginationOptions') paginationOptions: PaginationOptions,
  ) {
    return await this.PostsCommentsService.getPostComments(
      postId,
      paginationOptions,
    );
  }
}
