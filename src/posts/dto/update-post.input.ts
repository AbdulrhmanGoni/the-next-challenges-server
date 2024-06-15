import { InputType, Field } from '@nestjs/graphql';
import { Types } from 'mongoose';
import { MongoObjectIdScalar } from '../../global/dto/mongoObjectId.scalar';
import { PostResourceInterface, PostThumbnailInterface } from '../interfaces';
import { CreatePostPostResource } from './create-post.input';

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
export class UpdateResource implements PostResourceInterface {
  @Field(() => MongoObjectIdScalar)
  _id: Types.ObjectId;

  @Field({ nullable: true })
  title: string;

  @Field({ nullable: true })
  link: string;

  @Field({ nullable: true })
  type: string;
}

@InputType()
export class UpdateResourcesOptions {
  @Field(() => [CreatePostPostResource], { nullable: true })
  newResources: CreatePostPostResource[];

  @Field(() => [MongoObjectIdScalar], { nullable: true })
  removedResources: Types.ObjectId[];

  @Field(() => [UpdateResource], { nullable: true })
  updatedResources: UpdateResource[];
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

  @Field({ nullable: true })
  tags: EditTagsOptions;

  @Field({ nullable: true })
  resources: UpdateResourcesOptions;
}

@InputType()
export class EditPostInput {
  @Field(() => MongoObjectIdScalar)
  postId: Types.ObjectId;

  @Field()
  editOptions: EditPostOptions;
}
