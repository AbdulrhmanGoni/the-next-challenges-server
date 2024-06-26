import { Field, ObjectType } from '@nestjs/graphql';
import { Types } from 'mongoose';
import { MongoObjectIdScalar } from '../../global/dto/mongoObjectId.scalar';
import { VoteType } from '../../global/dto/vote.type';

@ObjectType()
export class PostComment {
  @Field(() => MongoObjectIdScalar)
  id: Types.ObjectId;

  @Field(() => MongoObjectIdScalar)
  commenterId: Types.ObjectId;

  @Field()
  comment: string;

  @Field(() => VoteType)
  upvotes: VoteType;

  @Field(() => VoteType)
  downvotes: VoteType;
}
