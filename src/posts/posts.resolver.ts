import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
  Int,
} from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { Post } from './dto/post-data.type';
import { CreatePostInput } from './dto/create-post.input';
import { EditPostInput } from './dto/update-post.input';
import { SearchForPostInput } from './dto/search-for-post.input';
import { User } from '../users/dto/user-data.type';
import { UsersService } from '../users/users.service';
import { PaginationOptions } from '../global/dto/pagination-options.dto';
import { Types } from 'mongoose';
import { MongoObjectIdScalar } from '../global/dto/mongoObjectId.scalar';
import { UseGuards } from '@nestjs/common';
import { CurrentUser, GqlJwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AuthorizedUser } from '../auth/dto/auth-related.dto';

@Resolver(() => Post)
@UseGuards(GqlJwtAuthGuard)
export class PostsResolver {
  constructor(
    private postsService: PostsService,
    private usersService: UsersService,
  ) {}

  @Mutation(() => Boolean)
  async createPost(
    @Args('createPostInput') createPostInput: CreatePostInput,
    @CurrentUser() user: AuthorizedUser,
  ) {
    return await this.postsService.createPost(createPostInput, user.id);
  }

  @Query(() => [Post], { name: 'posts' })
  async findPosts(
    @Args('searchQuery') searchQuery: SearchForPostInput,
    @Args('options', { nullable: true }) options: PaginationOptions,
  ) {
    return await this.postsService.findPosts(searchQuery, options);
  }

  @Query(() => Post, { name: 'post', nullable: true })
  async findPostById(
    @Args('postId', { type: () => MongoObjectIdScalar }) postId: Types.ObjectId,
  ) {
    return await this.postsService.findPostById(postId);
  }

  @ResolveField(() => User, { name: 'author', nullable: true })
  async findPostAuthor(@Parent() post: Post) {
    return await this.usersService.findUserById(post.authorId);
  }

  @Mutation(() => Boolean)
  async editPost(
    @Args('editPostInput') editPostInput: EditPostInput,
    @CurrentUser() user: AuthorizedUser,
  ) {
    return await this.postsService.editPost(
      editPostInput.postId,
      user.id,
      editPostInput.editOptions,
    );
  }

  @Mutation(() => Boolean)
  async deletePost(
    @Args('postId', { type: () => MongoObjectIdScalar }) postId: Types.ObjectId,
    @CurrentUser() user: AuthorizedUser,
  ) {
    return await this.postsService.deletePost(postId, user.id);
  }

  @Mutation(() => Boolean)
  async upvotePost(
    @Args('postId', { type: () => MongoObjectIdScalar }) postId: Types.ObjectId,
    @CurrentUser() user: AuthorizedUser,
  ) {
    return await this.postsService.upvotePost(postId, user.id);
  }

  @Mutation(() => Boolean)
  async downvotePost(
    @Args('postId', { type: () => MongoObjectIdScalar }) postId: Types.ObjectId,
    @CurrentUser() user: AuthorizedUser,
  ) {
    return await this.postsService.downvotePost(postId, user.id);
  }

  @Mutation(() => Boolean)
  async bookmarkPost(
    @Args('postId', { type: () => MongoObjectIdScalar }) postId: Types.ObjectId,
    @CurrentUser() user: AuthorizedUser,
  ) {
    return await this.usersService.bookmarkPost(user.id, postId);
  }

  @ResolveField(() => String, { name: 'userVote', nullable: true })
  async userVote(@CurrentUser() user: AuthorizedUser, @Parent() post: Post) {
    if (post.upvotes.voters.some((voterId) => user.id.equals(voterId))) {
      return 'upvote';
    }

    if (post.downvotes.voters.some((voterId) => user.id.equals(voterId))) {
      return 'downvote';
    }

    return null;
  }

  @Query(() => [Post], { name: 'userFeed' })
  async userFeed(@CurrentUser() user: AuthorizedUser) {
    return this.postsService.findPosts();
  }

  @ResolveField(() => Int, { name: 'upvotes', defaultValue: 0 })
  async getPostUpvotesCount(@Parent() post: Post) {
    return post.upvotes.totalVotes;
  }

  @ResolveField(() => Int, { name: 'downvotes', defaultValue: 0 })
  async getPostDownvotesCount(@Parent() post: Post) {
    return post.downvotes.totalVotes;
  }
}
