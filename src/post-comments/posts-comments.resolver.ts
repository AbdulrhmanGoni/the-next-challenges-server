import { Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlJwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PostsCommentsService } from './posts-comments.service';
import { PostsComments } from './schemas/posts-comments.schema';

@Resolver(() => PostsComments)
@UseGuards(GqlJwtAuthGuard)
export class PostsCommentsResolver {
  constructor(private PostsCommentsService: PostsCommentsService) {}
}
