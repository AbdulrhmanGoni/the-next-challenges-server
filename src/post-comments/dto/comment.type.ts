import { Field, GraphQLTimestamp, Int, ObjectType } from '@nestjs/graphql';
import { Types } from 'mongoose';
import { MongoObjectIdScalar } from '../../global/dto/mongoObjectId.scalar';

@ObjectType()
export class CommentOwner {
  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  headline: string;

  @Field({ nullable: true })
  avatar: string;
}

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

  @Field(() => CommentOwner)
  owner: CommentOwner;

  @Field(() => Int)
  upvotes: number;

  @Field(() => Int)
  downvotes: number;
}
