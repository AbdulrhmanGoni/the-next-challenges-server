import { Field, InterfaceType } from '@nestjs/graphql';
import { ImageInterface } from '../interfaces';

@InterfaceType()
export abstract class UserAvatarInterface extends ImageInterface {
  @Field()
  id: string;

  @Field()
  src: string;
}
