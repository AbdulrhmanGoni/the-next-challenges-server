import { forwardRef, Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsResolver } from './posts.resolver';
import { Post, PostSchema } from './schemas/post.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from 'src/users/users.module';

@Module({
  providers: [PostsResolver, PostsService],
  exports: [PostsService],
  imports: [
    forwardRef(() => UsersModule),
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
  ],
})
export class PostsModule {}
