import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class SignUpUserInput {
  @Field({ description: 'The firs name of the user' })
  firstName: string;

  @Field({ description: 'The last name of the user' })
  lastName: string;

  @Field({ description: 'The headline of the user' })
  headline: string;

  @Field({ description: 'The email of the user' })
  email: string;

  @Field({ description: 'The password of the user' })
  password: string;
}
