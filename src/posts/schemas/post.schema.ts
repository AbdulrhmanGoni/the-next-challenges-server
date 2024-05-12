import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class Post {
  @Prop()
  title: string;

  @Prop()
  body: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  authorId: mongoose.Schema.Types.ObjectId;
}

export type PostDocument = HydratedDocument<Post>;

export const PostSchema = SchemaFactory.createForClass(Post);
