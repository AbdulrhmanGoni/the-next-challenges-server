import { Field, ObjectType } from '@nestjs/graphql';

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
