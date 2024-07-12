import { Field, GraphQLTimestamp, Int, ObjectType } from '@nestjs/graphql';
import { Types } from 'mongoose';
import { MongoObjectIdScalar } from '../../global/dto/mongoObjectId.scalar';

@ObjectType()
export class PostComment {
  @Field(() => MongoObjectIdScalar)
  id: Types.ObjectId;

  @Field(() => MongoObjectIdScalar)
  commenterId: Types.ObjectId;

  @Field()
  comment: string;

  @Field(() => GraphQLTimestamp, { nullable: true })
  createdAt: Date;

  @Field(() => Int)
  upvotes: number;

  @Field(() => Int)
  downvotes: number;
}
