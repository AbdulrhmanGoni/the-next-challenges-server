import { Module } from '@nestjs/common';
import { PostsCommentsService } from './posts-comments.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  PostsComments,
  PostsCommentsSchema,
} from './schemas/posts-comments.schema';
import { PostsCommentsResolver } from './posts-comments.resolver';

@Module({
  providers: [PostsCommentsService, PostsCommentsResolver],
  imports: [
    MongooseModule.forFeature([
      { name: PostsComments.name, schema: PostsCommentsSchema },
    ]),
  ],
})
export class PostsCommentsModule {}
