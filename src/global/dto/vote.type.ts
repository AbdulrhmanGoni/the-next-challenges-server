import { Field, Int, ObjectType } from '@nestjs/graphql';
import { MongoObjectIdScalar } from './mongoObjectId.scalar';
import { Types } from 'mongoose';
import { VoteInterface } from './interfaces';

@ObjectType({ implements: () => VoteInterface })
export class VoteType {
  @Field(() => Int)
  totalVotes: number;

  @Field(() => [MongoObjectIdScalar])
  voters: Types.ObjectId[];
}
