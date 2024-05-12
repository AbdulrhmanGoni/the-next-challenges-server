import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SignUpUserInput {
  @Field({ description: 'The full name of the user' })
  fullName: string;

  @Field({ description: 'The headline of the user' })
  headline: string;

  @Field({ description: 'The email of the user' })
  email: string;

  @Field({ description: 'The password of the user' })
  password: string;
}
