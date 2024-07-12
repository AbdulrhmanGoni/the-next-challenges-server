import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { VotesSchema } from '../../global/schemas/vote.schema';

@Schema({ versionKey: false, _id: false, timestamps: { updatedAt: false } })
export class PostComment {
  @Prop({ type: Types.ObjectId, required: true })
  id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  commenterId: Types.ObjectId;

  @Prop({ required: true })
  comment: string;

  @Prop({ default: { totalVotes: 0, voters: [] } })
  upvotes: VotesSchema;

  @Prop({ default: { totalVotes: 0, voters: [] } })
  downvotes: VotesSchema;
}

@Schema({ versionKey: false })
export class PostsComments {
  @Prop({ type: [PostComment], required: true, default: [] })
  comments: PostComment[];
}

export const PostsCommentsSchema = SchemaFactory.createForClass(PostsComments);
