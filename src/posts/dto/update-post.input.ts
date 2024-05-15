import { InputType, Field } from '@nestjs/graphql';
import { Types } from 'mongoose';
import { MongoObjectIdScalar } from '../../global-dto/mongoObjectId.scalar';

@InputType()
class UpdatePostOptions {
  @Field({ nullable: true })
  title: string;

  @Field({ nullable: true })
  body: string;
}

@InputType()
export class UpdatePostInput {
  @Field(() => MongoObjectIdScalar)
  postId: Types.ObjectId;

  @Field()
  updateOptions: UpdatePostOptions;
}
