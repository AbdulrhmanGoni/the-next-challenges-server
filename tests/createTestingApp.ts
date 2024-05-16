import { Test, TestingModule } from '@nestjs/testing';
import { join } from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MongoObjectIdScalar } from '../src/global-dto/mongoObjectId.scalar';
import { UsersModule } from '../src/users/users.module';
import { PostsModule } from '../src/posts/posts.module';
import testingDatabaseURI from './testingDatabaseURI';

export default async function createTestingApp() {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [
      MongooseModule.forRoot(testingDatabaseURI),
      GraphQLModule.forRoot<ApolloDriverConfig>({
        driver: ApolloDriver,
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        resolvers: { MongoObjectId: MongoObjectIdScalar },
      }),
      UsersModule,
      PostsModule,
    ],
  }).compile();

  return moduleFixture.createNestApplication();
}
