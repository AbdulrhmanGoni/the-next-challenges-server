import { Field, InterfaceType } from '@nestjs/graphql';

@InterfaceType()
export abstract class ImageInterface {
  @Field()
  id: string;

  @Field()
  src: string;
}
