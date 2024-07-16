import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { UsersService } from './users.service';
import { UpdateUserDataInput } from './dto/update-data-user.input';
import { PostsService } from '../posts/posts.service';
import { SearchForUserInput } from './dto/search-for-users.input';
import { User } from './dto/user-data.type';
import { Post } from '../posts/dto/post-data.type';
import { UserDocument } from './schemas/user.schema';
import { PaginationOptions } from '../global/dto/pagination-options.dto';
import { MongoObjectIdScalar } from '../global/dto/mongoObjectId.scalar';
import { Types } from 'mongoose';
import { UseGuards } from '@nestjs/common';
import { CurrentUser, GqlJwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AuthorizedUser } from '../auth/dto/auth-related.dto';
import { UserBookmarksPaginationResponse } from './dto/user-bookmarks-pagination-response.type';

@Resolver(() => User)
@UseGuards(GqlJwtAuthGuard)
export class UsersResolver {
  constructor(
    private usersService: UsersService,
    private postsService: PostsService,
  ) {}

  @Query(() => User, { name: 'userData', nullable: true })
  async getUserData(@CurrentUser() user: AuthorizedUser) {
    return await this.usersService.findUserById(user.id);
  }

  @Query(() => User, { name: 'user', nullable: true })
  async findUserById(
    @Args('userId', { type: () => MongoObjectIdScalar }) userId: Types.ObjectId,
  ) {
    return await this.usersService.findUserById(userId);
  }

  @Query(() => [User], { name: 'users' })
  async findUsers(
    @Args('searchQuery') searchQuery: SearchForUserInput,
    @Args('options', { nullable: true }) options: PaginationOptions,
  ) {
    return await this.usersService.findUsers(searchQuery, options);
  }

  @ResolveField(() => [Post], { name: 'posts', nullable: true })
  async findPosts(
    @Parent() author: UserDocument,
    @Args('options', { nullable: true }) options: PaginationOptions,
  ) {
    return await this.postsService.findPosts({ authorId: author._id }, options);
  }

  @Mutation(() => Boolean)
  async updateUserData(
    @Args('updateUserDataInput') updateUserDataInput: UpdateUserDataInput,
    @CurrentUser() user: AuthorizedUser,
  ) {
    return await this.usersService.updateUserData(user.id, updateUserDataInput);
  }

  @Query(() => UserBookmarksPaginationResponse)
  async getUserBookmarks(
    @Args('paginationOptions', {
      nullable: true,
      defaultValue: { pageSize: 5, page: 1 },
    })
    paginationOptions: PaginationOptions,
    @CurrentUser() user: AuthorizedUser,
  ) {
    return await this.usersService.getUserBookmarks(user.id, paginationOptions);
  }
}
