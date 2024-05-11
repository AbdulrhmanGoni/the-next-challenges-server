import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class SignUpUserInput {
  @Field({ description: 'The full name of the user' })
  fullName: string;

  @Field({ description: 'The email of the user' })
  email: string;

  @Field({ description: 'The password of the user' })
  password: string;
}
