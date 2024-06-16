import { Field, Int, InterfaceType } from '@nestjs/graphql';
import { MongoObjectIdScalar } from './mongoObjectId.scalar';
import { Types } from 'mongoose';

@InterfaceType()
export abstract class VoteInterface {
  @Field(() => Int)
  totalVotes: number;

  @Field(() => [MongoObjectIdScalar])
  voters: Types.ObjectId[];
}
