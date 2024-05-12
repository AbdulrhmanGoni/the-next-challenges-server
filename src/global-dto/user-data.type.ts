import { ObjectType, Field } from '@nestjs/graphql';
import { Post } from 'src/global-dto/post-data.type';
import { MongoObjectIdScalar } from './mongoObjectId.scalar';
import { Types } from 'mongoose';

@ObjectType()
export class User {
  @Field(() => MongoObjectIdScalar, { description: 'The ID of the user' })
  id: Types.ObjectId;

  @Field({ description: 'The full name of the user' })
  fullName: string;

  @Field({ description: 'The headline of the user' })
  headline: string;

  @Field({ description: 'The email of the user' })
  email: string;

  @Field({
    description: 'The role of the user',
    defaultValue: 'user',
  })
  role: string;

  @Field(() => [Post], {
    description: 'The posts of the user',
    defaultValue: [],
  })
  posts: Post[];
}
