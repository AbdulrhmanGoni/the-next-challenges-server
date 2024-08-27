import { Module } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import {
  InjectConnection,
  InjectModel,
  MongooseModule,
} from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { User, UserSchema } from '../src/users/schemas/user.schema';
import { Post, PostSchema } from '../src/posts/schemas/post.schema';
import {
  PostsComments,
  PostsCommentsSchema,
} from '../src/post-comments/schemas/posts-comments.schema';

const collectionsModelsNamesMap = {
  users: 'UserModel',
  posts: 'PostsModel',
  'posts-comments': 'PostCommentsModel',
};

type CollectionsModels = keyof typeof collectionsModelsNamesMap;

@Injectable()
export class DatabaseService {
  models: Record<string, Model<User | Post | PostsComments>>;

  constructor(
    @InjectConnection() private db: Connection,
    @InjectModel(User.name) private UserModel: Model<User>,
    @InjectModel(Post.name) private PostModel: Model<Post>,
    @InjectModel(PostsComments.name)
    private PostCommentsModel: Model<PostsComments>,
  ) {
    this.models = { PostCommentsModel, PostModel, UserModel };
  }

  async clearCollections(collections: CollectionsModels[]) {
    for (const collectionName of collections) {
      const modelName = collectionsModelsNamesMap[collectionName];
      await this.models[modelName].deleteMany({});
    }
  }
}

@Module({
  providers: [DatabaseService],
  exports: [],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
    MongooseModule.forFeature([
      { name: PostsComments.name, schema: PostsCommentsSchema },
    ]),
  ],
})
export class TestingDatabaseModule {}
