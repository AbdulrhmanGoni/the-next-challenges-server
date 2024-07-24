import { InputType, Field } from '@nestjs/graphql';
import { UserAvatarInterface } from '../interfaces';

@InputType()
export abstract class UpdateAvatarInput implements UserAvatarInterface {
  @Field({ nullable: true })
  id: string;

  @Field({ nullable: true })
  src: string;
}

@InputType()
export class UpdateUserDataInput {
  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field({ nullable: true })
  headline?: string;

  @Field({ nullable: true })
  avatar?: UpdateAvatarInput;
}
