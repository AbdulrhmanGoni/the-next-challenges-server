import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { PostResourceInterface, PostThumbnailInterface } from '../interfaces';
import { VotesSchema } from '../../global/schemas/vote.schema';

@Schema({ versionKey: false, _id: false })
class Thumbnail implements PostThumbnailInterface {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  src: string;
}

@Schema({ versionKey: false })
class Resource implements PostResourceInterface {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  link: string;
}

@Schema({ versionKey: false, timestamps: true })
export class Post {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  body: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  authorId: Types.ObjectId;

  @Prop({ type: Thumbnail })
  thumbnail: Thumbnail;

  @Prop({ required: true })
  category: string;

  @Prop({ default: [] })
  tags: string[];

  @Prop({ default: { totalVotes: 0, voters: [] } })
  upvotes: VotesSchema;

  @Prop({ default: { totalVotes: 0, voters: [] } })
  downvotes: VotesSchema;

  @Prop({ type: [Resource], default: [] })
  resources: Resource[];

  @Prop({ type: Number, default: 0 })
  commentsCount: number;
}

export type PostDocument = HydratedDocument<Post>;

export const PostSchema = SchemaFactory.createForClass(Post);
