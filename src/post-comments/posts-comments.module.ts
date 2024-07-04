import { Module } from '@nestjs/common';
import { PostsCommentsService } from './posts-comments.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  PostsComments,
  PostsCommentsSchema,
} from './schemas/posts-comments.schema';
import { PostsCommentsResolver } from './posts-comments.resolver';
import { PostsModule } from '../posts/posts.module';

@Module({
  providers: [PostsCommentsService, PostsCommentsResolver],
  imports: [
    MongooseModule.forFeature([
      { name: PostsComments.name, schema: PostsCommentsSchema },
    ]),
    PostsModule,
  ],
})
export class PostsCommentsModule {}
