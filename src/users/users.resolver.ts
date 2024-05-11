import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { UsersService } from './users.service';
import { SignUpUserInput } from './dto/create-user.input';
import { UpdateUserDataInput } from './dto/update-data-user.input';
import { PostsService } from 'src/posts/posts.service';
import { SearchForUserInput } from './dto/search-for-users.input';
import { User } from 'src/global-dto/user-data.type';
import { Post } from 'src/global-dto/post-data.type';
import { UserDocument } from './schemas/user.schema';
import { PaginationOptions } from 'src/global-dto/pagination-options.dto';
import { MongoObjectIdScalar } from 'src/global-dto/mongoObjectId.scalar';
import { Types } from 'mongoose';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private usersService: UsersService,
    private postsService: PostsService,
  ) {}

  @Mutation(() => Boolean)
  async signUpUser(@Args('signUpUserInput') signUpUserInput: SignUpUserInput) {
    return await this.usersService.signUpUser(signUpUserInput);
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
  async posts(
    @Parent() author: UserDocument,
    @Args('options', { nullable: true }) options: PaginationOptions,
  ) {
    return await this.postsService.findPosts({ authorId: author.id }, options);
  }

  @Mutation(() => Boolean)
  async updateUserData(
    @Args('updateUserDataInput') updateUserDataInput: UpdateUserDataInput,
  ) {
    return await this.usersService.updateUserData(updateUserDataInput);
  }
}