import { ObjectType, Field } from '@nestjs/graphql';
import { MongoObjectIdScalar } from '../../global/dto/mongoObjectId.scalar';
import { Types } from 'mongoose';
import { roles } from '../../constants/users-roles';
import { UserAvatarInterface } from '../interfaces';

@ObjectType()
export abstract class UserAvatar implements UserAvatarInterface {
  @Field()
  id: string;

  @Field()
  src: string;
}

@ObjectType()
export class User {
  @Field(() => MongoObjectIdScalar, { description: 'The ID of the user' })
  id: Types.ObjectId;

  @Field({ description: 'The first name of the user' })
  firstName: string;

  @Field({ description: 'The last name of the user' })
  lastName: string;

  @Field({ description: 'The headline of the user' })
  headline: string;

  @Field(() => UserAvatar, {
    description: 'The profile picture of the user',
    nullable: true,
  })
  avatar: UserAvatar;

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
