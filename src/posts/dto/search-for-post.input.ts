import { InputType, Field } from '@nestjs/graphql';
import { Types } from 'mongoose';
import { MongoObjectIdScalar } from 'src/global-dto/mongoObjectId.scalar';

@InputType()
export class SearchForPostInput {
  @Field(() => MongoObjectIdScalar, { nullable: true })
  id?: Types.ObjectId;

  @Field(() => MongoObjectIdScalar, { nullable: true })
  authorId?: Types.ObjectId;

  @Field({ nullable: true })
  title?: string;
}
