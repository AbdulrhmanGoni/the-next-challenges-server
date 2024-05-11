import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { MongoObjectIdScalar } from './global-dto/mongoObjectId.scalar';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017'),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      resolvers: { MongoObjectId: MongoObjectIdScalar },
    }),
    UsersModule,
  ],
})
export class AppModule {}
