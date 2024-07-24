import { InputType, Field } from '@nestjs/graphql';
import { UserAvatarInterface } from '../../users/interfaces';

@InputType()
export abstract class AvatarInput implements UserAvatarInterface {
  @Field()
  id: string;

  @Field()
  src: string;
}

@InputType()
export class SignUpUserInput {
  @Field({ description: 'The first name of the user' })
  firstName: string;

  @Field({ description: 'The last name of the user' })
  lastName: string;

  @Field({ description: 'The headline of the user', nullable: true })
  avatar?: AvatarInput;

  @Field({ description: 'The headline of the user' })
  headline: string;

  @Field({ description: 'The email of the user' })
  email: string;

  @Field({ description: 'The password of the user' })
  password: string;
}
