import { Field, ObjectType } from '@nestjs/graphql';
import { Post } from './post-data.type';

@ObjectType()
export class UserFeedsPaginationResponse {
  @Field()
  areThereMore: boolean;

  @Field(() => [Post])
  posts: Post[];
}
