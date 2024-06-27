import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateUserDataInput {
  @Field({ nullable: true })
  fullName?: string;

  @Field({ nullable: true })
  headline?: string;

  @Field({ nullable: true })
  avatar: string;
}
