import { InputType, Field } from '@nestjs/graphql';
import { PostThumbnailInterface } from '../interfaces';

@InputType()
class CreatePostThumbnail implements PostThumbnailInterface {
  @Field()
  src: string;
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
}
