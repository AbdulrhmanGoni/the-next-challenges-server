import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateUserDataInput {
  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field({ nullable: true })
  headline?: string;

  @Field({ nullable: true })
  avatar?: string;
}
