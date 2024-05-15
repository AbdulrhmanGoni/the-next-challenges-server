import { InputType, Field } from '@nestjs/graphql';
import { Types } from 'mongoose';
import { MongoObjectIdScalar } from '../../global-dto/mongoObjectId.scalar';

@InputType()
class UpdateUserDataOptions {
  @Field({ nullable: true })
  fullName?: string;

  @Field({ nullable: true })
  headline?: string;
}

@InputType()
export class UpdateUserDataInput {
  @Field(() => MongoObjectIdScalar)
  userId: Types.ObjectId;

  @Field()
  updateOptions: UpdateUserDataOptions;
}
