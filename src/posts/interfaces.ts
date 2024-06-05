import { Field, InterfaceType } from '@nestjs/graphql';

@InterfaceType()
export abstract class PostThumbnailInterface {
  @Field()
  src: string;
}
