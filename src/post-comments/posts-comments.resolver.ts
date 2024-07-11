import { CurrentUser, GqlJwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { Types } from 'mongoose';
import { BadRequestException, UseGuards } from '@nestjs/common';
import { MongoObjectIdScalar } from '../global/dto/mongoObjectId.scalar';
import { AuthorizedUser } from '../auth/dto/auth-related.dto';
import { PostsCommentsService } from './posts-comments.service';
import { PostsComments } from './schemas/posts-comments.schema';
import { PaginationOptions } from '../global/dto/pagination-options.dto';
import { PostCommentsPaginationResponse } from './dto/comments-pagination-response.type';

@Resolver(() => PostsComments)
@UseGuards(GqlJwtAuthGuard)
export class PostsCommentsResolver {
  constructor(private PostsCommentsService: PostsCommentsService) {}

  @Mutation(() => String)
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

  @Query(() => PostCommentsPaginationResponse)
  async getPostComments(
    @Args('postId', { type: () => MongoObjectIdScalar }) postId: Types.ObjectId,
    @Args('paginationOptions') paginationOptions: PaginationOptions,
  ) {
    return await this.PostsCommentsService.getPostComments(
      postId,
      paginationOptions,
    );
  }

  @Mutation(() => Boolean)
  async votePostComment(
    @Args('postId', { type: () => MongoObjectIdScalar }) postId: Types.ObjectId,
    @Args('commentId', { type: () => MongoObjectIdScalar })
    commentId: Types.ObjectId,
    @Args('voteType') voteType: 'upvote' | 'downvote',
    @CurrentUser() user: AuthorizedUser,
  ) {
    const args: [Types.ObjectId, Types.ObjectId, Types.ObjectId] = [
      postId,
      commentId,
      user.id,
    ];
    if (voteType === 'upvote') {
      return await this.PostsCommentsService.upvotePostComment(...args);
    } else if (voteType === 'downvote') {
      return await this.PostsCommentsService.downvotePostComment(...args);
    } else {
      throw new BadRequestException(
        `Unknown vote type (${voteType}), only "upvote" and "downvote" avalable`,
      );
    }
  }
}
