import { ObjectType, Field, GraphQLTimestamp } from '@nestjs/graphql';
import { MongoObjectIdScalar } from '../../global/dto/mongoObjectId.scalar';
import { Types } from 'mongoose';
import { PostResourceInterface, PostThumbnailInterface } from '../interfaces';
import { VoteType } from '../../global/dto/vote.type';

@ObjectType({ implements: () => [PostThumbnailInterface] })
class PostThumbnail implements PostThumbnailInterface {
  src: string;
}

@ObjectType({ implements: () => [PostThumbnailInterface] })
class PostResource implements PostResourceInterface {
  @Field()
  title: string;

  @Field()
  type: string;

  @Field()
  link: string;
}

@ObjectType()
export class Post {
  @Field(() => MongoObjectIdScalar, { description: 'The ID of the post' })
  id: Types.ObjectId;

  @Field({ description: 'The title of the post' })
  title: string;

  @Field({ description: 'The thumbnail of the post', nullable: true })
  thumbnail: PostThumbnail;

  @Field({ description: 'The body or the content of the post' })
  body: string;

  @Field(() => MongoObjectIdScalar, { description: "The ID of post's author" })
  authorId: Types.ObjectId;

  @Field({ description: 'The category of the post' })
  category: string;

  @Field(() => [String], { defaultValue: [] })
  tags: string[];

  @Field(() => VoteType)
  upvotes: VoteType;

  @Field(() => VoteType)
  downvotes: VoteType;

  @Field(() => [PostResource])
  resources: PostResource[];

  @Field(() => GraphQLTimestamp, { name: 'publishedAt' })
  createdAt: Date;
}
