import { Field, ObjectType } from '@nestjs/graphql';
import { Types } from 'mongoose';

@ObjectType()
export class JWTToken {
  @Field()
  accessToken: string;
}

export type JWTTokenPayload = {
  id: string;
  email: string;
  role: string;
};

export type AuthorizedUser = {
  id: Types.ObjectId;
  email: string;
  role: string;
};
