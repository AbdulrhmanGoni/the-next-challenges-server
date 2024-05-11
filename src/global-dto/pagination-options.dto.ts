import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class PaginationOptions {
  @Field(() => Int, { nullable: true })
  page?: number;

  @Field(() => Int, { nullable: true })
  pageSize?: number;
}
