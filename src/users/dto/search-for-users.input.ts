import { InputType, Field } from '@nestjs/graphql';
import { Types } from 'mongoose';
import { MongoObjectIdScalar } from '../../global/dto/mongoObjectId.scalar';

@InputType()
export class SearchForUserInput {
  @Field(() => MongoObjectIdScalar, { nullable: true })
  id?: Types.ObjectId;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;
}
