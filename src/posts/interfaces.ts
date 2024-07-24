import { Field, InterfaceType } from '@nestjs/graphql';
import { ImageInterface } from '../interfaces';

@InterfaceType()
export abstract class PostThumbnailInterface extends ImageInterface {
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
