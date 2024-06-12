import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { PostsModule } from '../posts/posts.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { Post, PostSchema } from '../posts/schemas/post.schema';

@Module({
  providers: [UsersService, UsersResolver],
  exports: [UsersService],
  imports: [
    forwardRef(() => PostsModule),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
  ],
})
export class UsersModule {}
