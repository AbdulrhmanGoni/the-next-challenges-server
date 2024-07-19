import { Field, InterfaceType } from '@nestjs/graphql';

@InterfaceType()
export abstract class PostThumbnailInterface {
  @Field()
  id: string;

  @Field()
  src: string;
}

@InterfaceType()
export abstract class PostResourceInterface {
  @Field()
  link: string;

  @Field()
  title: string;

  @Field()
  type: string;
}
