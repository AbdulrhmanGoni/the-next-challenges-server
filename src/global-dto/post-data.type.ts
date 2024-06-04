import { ObjectType, Field, Int } from '@nestjs/graphql';
import { MongoObjectIdScalar } from './mongoObjectId.scalar';
import { Types } from 'mongoose';

@ObjectType()
class Votes {
  @Field(() => Int)
  totalVotes: number;

  @Field(() => [MongoObjectIdScalar])
  voters: Types.ObjectId[];
}

@ObjectType()
export class Post {
  @Field(() => MongoObjectIdScalar, { description: 'The ID of the post' })
  id: Types.ObjectId;

  @Field({ description: 'The title of the post' })
  title: string;

  @Field({ description: 'The body or the content of the post' })
  body: string;

  @Field(() => MongoObjectIdScalar, { description: "The ID of post's author" })
  authorId: Types.ObjectId;

  @Field({ description: 'The category of the post' })
  category: string;

  @Field(() => Votes)
  upvotes: Votes;

  @Field(() => Votes)
  downvotes: Votes;
}
