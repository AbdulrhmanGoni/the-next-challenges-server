import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class LogInUserInput {
  @Field()
  email: string;

  @Field()
  password: string;
}
