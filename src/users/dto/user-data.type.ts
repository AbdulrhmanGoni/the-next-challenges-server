import { ObjectType, Field } from '@nestjs/graphql';
import { MongoObjectIdScalar } from '../../global/dto/mongoObjectId.scalar';
import { Types } from 'mongoose';
import { roles } from '../../constants/users-roles';

@ObjectType()
export class User {
  @Field(() => MongoObjectIdScalar, { description: 'The ID of the user' })
  id: Types.ObjectId;

  @Field({ description: 'The full name of the user' })
  fullName: string;

  @Field({ description: 'The headline of the user' })
  headline: string;

  @Field({
    description: 'The profile picture of the user',
    nullable: true,
  })
  avatar: string;

  @Field({ description: 'The email of the user' })
  email: string;

  @Field({
    description: 'The role of the user',
    defaultValue: roles.USER,
  })
  role: string;

  @Field(() => [MongoObjectIdScalar], {
    description: 'The posts that the user has saved them',
  })
  bookmarks: [Types.ObjectId];
}
