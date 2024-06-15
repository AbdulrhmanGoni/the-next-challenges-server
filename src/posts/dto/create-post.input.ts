import { InputType, Field } from '@nestjs/graphql';
import { PostResourceInterface, PostThumbnailInterface } from '../interfaces';

@InputType()
class CreatePostThumbnail implements PostThumbnailInterface {
  @Field()
  src: string;
}

@InputType()
export class CreatePostPostResource implements PostResourceInterface {
  @Field()
  title: string;

  @Field()
  type: string;

  @Field()
  link: string;
}

@InputType()
export class CreatePostInput {
  @Field()
  title: string;

  @Field()
  body: string;

  @Field()
  category: string;

  @Field({ nullable: true })
  thumbnail: CreatePostThumbnail;

  @Field(() => [String], { nullable: true })
  tags: string[];

  @Field(() => [CreatePostPostResource])
  resources: CreatePostPostResource[];
}
