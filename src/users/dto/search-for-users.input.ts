import { InputType, Field } from '@nestjs/graphql';
import { Types } from 'mongoose';
import { MongoObjectIdScalar } from 'src/global-dto/mongoObjectId.scalar';

@InputType()
export class SearchForUserInput {
  @Field(() => MongoObjectIdScalar, { nullable: true })
  id?: Types.ObjectId;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  fullName?: string;
}

@InputType()
export class SearchForUsersInput {
  @Field(() => [MongoObjectIdScalar], { nullable: true })
  id?: Types.ObjectId[];

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  fullName?: string;
}
