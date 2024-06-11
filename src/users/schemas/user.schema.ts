import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, HydratedDocument } from 'mongoose';
import { roles } from '../../constants/users-roles';

@Schema({ versionKey: false })
export class User {
  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true })
  headline: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: roles.USER, required: true })
  role: string;

  @Prop({ type: [Types.ObjectId], ref: 'Post', default: [] })
  posts: Types.ObjectId[];

  @Prop({ type: [Types.ObjectId], ref: 'Post', default: [] })
  bookmarks: Types.ObjectId[];
}

export type UserDocument = HydratedDocument<User>;

export const UserSchema = SchemaFactory.createForClass(User);
