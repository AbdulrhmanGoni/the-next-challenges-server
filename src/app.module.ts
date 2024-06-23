import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { MongoObjectIdScalar } from './global/dto/mongoObjectId.scalar';
import { AuthModule } from './auth/auth.module';
import { PostsCommentsModule } from './post-comments/posts-comments.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://primary-mongodb,secondary-mongodb-1,secondary-mongodb-2',
    ),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      resolvers: { MongoObjectId: MongoObjectIdScalar },
      buildSchemaOptions: {
        dateScalarMode: 'timestamp',
      },
    }),
    UsersModule,
    PostsModule,
    AuthModule,
    PostsCommentsModule,
  ],
})
export class AppModule {}
