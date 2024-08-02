import { Field, ObjectType } from '@nestjs/graphql';
import { Post } from 'src/posts/dto/post-data.type';

@ObjectType()
export class UserBookmarksPaginationResponse {
  @Field()
  areThereMore: boolean;

  @Field(() => [Post])
  posts: Post[];
}
