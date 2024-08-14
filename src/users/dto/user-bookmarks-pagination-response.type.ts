import { Field, ObjectType } from '@nestjs/graphql';
import { Post } from '../../posts/dto/post-data.type';

@ObjectType()
export class UserBookmarksPaginationResponse {
  @Field()
  areThereMore: boolean;

  @Field(() => [Post])
  posts: Post[];
}
