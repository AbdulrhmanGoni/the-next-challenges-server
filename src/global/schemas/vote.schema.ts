import { Prop, Schema } from '@nestjs/mongoose';
import { VoteInterface } from '../dto/interfaces';
import { Types } from 'mongoose';

@Schema({ versionKey: false, _id: false })
export class VotesSchema implements VoteInterface {
  @Prop({ required: true })
  totalVotes: number;

  @Prop({ type: [Types.ObjectId], required: true })
  voters: Types.ObjectId[];
}
