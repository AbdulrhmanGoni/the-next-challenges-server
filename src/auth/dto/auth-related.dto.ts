import { Field, ObjectType } from '@nestjs/graphql';
import { Types } from 'mongoose';

@ObjectType()
export class JWT {
  @Field()
  accessToken: string;
}

export type JWTPayload = {
  id: string;
  email: string;
  role: string;
};

export type AuthorizedUser = {
  id: Types.ObjectId;
  email: string;
  role: string;
};
