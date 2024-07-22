import { Field, ObjectType } from '@nestjs/graphql';
import { PostComment } from './comment.type';

@ObjectType()
export class PostCommentsPaginationResponse {
  @Field()
  areThereMore: boolean;

  @Field(() => [PostComment])
  comments: PostComment[];
}
