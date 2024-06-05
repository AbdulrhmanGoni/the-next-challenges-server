import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { PostThumbnailInterface } from '../interfaces';

@Schema({ versionKey: false, _id: false })
class Votes {
  @Prop({ required: true })
  totalVotes: number;

  @Prop({ type: [Types.ObjectId], required: true })
  voters: Types.ObjectId[];
}

@Schema({ versionKey: false, _id: false })
class Thumbnail implements PostThumbnailInterface {
  @Prop({ required: true })
  src: string;
}

@Schema({ versionKey: false })
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

  @Prop({ default: { totalVotes: 0, voters: [] } })
  upvotes: Votes;

  @Prop({ default: { totalVotes: 0, voters: [] } })
  downvotes: Votes;
}

export type PostDocument = HydratedDocument<Post>;

export const PostSchema = SchemaFactory.createForClass(Post);
