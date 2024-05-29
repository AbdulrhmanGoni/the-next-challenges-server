import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { Post } from '../global-dto/post-data.type';
import { CreatePostInput } from './dto/create-post.input';
import { EditPostInput } from './dto/update-post.input';
import { SearchForPostInput } from './dto/search-for-post.input';
import { User } from '../global-dto/user-data.type';
import { UsersService } from '../users/users.service';
import { PaginationOptions } from '../global-dto/pagination-options.dto';
import { Types } from 'mongoose';
import { MongoObjectIdScalar } from '../global-dto/mongoObjectId.scalar';
import { UseGuards } from '@nestjs/common';
import { CurrentUser, GqlJwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AuthorizedUser } from '../auth/dto/auth-related.dto';

@Resolver(() => Post)
export class PostsResolver {
  constructor(
    private postsService: PostsService,
    private usersService: UsersService,
  ) {}

  @Mutation(() => Boolean)
  @UseGuards(GqlJwtAuthGuard)
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
  @UseGuards(GqlJwtAuthGuard)
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
}
