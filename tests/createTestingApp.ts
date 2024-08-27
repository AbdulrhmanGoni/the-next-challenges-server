import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MongoObjectIdScalar } from '../src/global/dto/mongoObjectId.scalar';
import { UsersModule } from '../src/users/users.module';
import { PostsModule } from '../src/posts/posts.module';
import testingDatabaseURI from './testingDatabaseURI';
import { AuthModule } from '../src/auth/auth.module';
import { PostsCommentsModule } from '../src/post-comments/posts-comments.module';
import { TestingDatabaseModule } from './TestingDatabaseModule';

export default async function createTestingApp() {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [
      MongooseModule.forRoot(testingDatabaseURI),
      GraphQLModule.forRoot<ApolloDriverConfig>({
        driver: ApolloDriver,
        resolvers: { MongoObjectId: MongoObjectIdScalar },
        buildSchemaOptions: {
          dateScalarMode: 'timestamp',
        },
      }),
      UsersModule,
      PostsModule,
      AuthModule,
      PostsCommentsModule,
      TestingDatabaseModule,
    ],
  }).compile();

  return moduleFixture.createNestApplication();
}
