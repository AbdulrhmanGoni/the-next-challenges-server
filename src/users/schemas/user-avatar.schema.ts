import { Prop, Schema } from '@nestjs/mongoose';
import { UserAvatarInterface } from '../interfaces';

@Schema({ versionKey: false, _id: false })
export abstract class AvatarSchema implements UserAvatarInterface {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  src: string;
}
