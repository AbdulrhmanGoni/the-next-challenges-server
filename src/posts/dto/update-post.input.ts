import { InputType, Field } from '@nestjs/graphql';
import { Types } from 'mongoose';
import { MongoObjectIdScalar } from '../../global-dto/mongoObjectId.scalar';
import { PostThumbnailInterface } from '../interfaces';

@InputType()
class EditPostThumbnail implements PostThumbnailInterface {
  @Field()
  src: string;
}

@InputType()
export class EditTagsOptions {
  @Field(() => [String], { nullable: true })
  newTags: string[];

  @Field(() => [String], { nullable: true })
  removedTags: string[];
}

@InputType()
export class EditPostOptions {
  @Field({ nullable: true })
  title: string;

  @Field({ nullable: true })
  body: string;

  @Field({ nullable: true })
  thumbnail: EditPostThumbnail;

  @Field({ nullable: true })
  category: string;
}

@InputType()
export class EditPostInput {
  @Field(() => MongoObjectIdScalar)
  postId: Types.ObjectId;

  @Field()
  editOptions: EditPostOptions;
}
