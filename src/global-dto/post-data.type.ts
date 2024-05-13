import { ObjectType, Field } from '@nestjs/graphql';
import { MongoObjectIdScalar } from './mongoObjectId.scalar';
import { Types } from 'mongoose';

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
}