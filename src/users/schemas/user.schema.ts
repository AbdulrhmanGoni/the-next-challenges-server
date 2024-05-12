import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { roles } from 'src/constants/users-roles';

@Schema()
export class User {
  @Prop()
  fullName: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop({ default: roles.USER })
  role: string;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Post', default: [] })
  posts: mongoose.Schema.Types.ObjectId[];
}

export type UserDocument = mongoose.HydratedDocument<User>;

export const UserSchema = SchemaFactory.createForClass(User);
