import { GraphQLScalarType, GraphQLError, Kind } from 'graphql';
import { isObjectIdOrHexString, Types } from 'mongoose';

export const MongoObjectIdScalar = new GraphQLScalarType({
  name: 'MongoObjectId',
  description: 'The `ObjectId` type of Mongo database documents `_id` field',
  serialize(value: Types.ObjectId): string {
    return value.toString();
  },
  parseValue(value: string): Types.ObjectId {
    if (isObjectIdOrHexString(value)) {
      return new Types.ObjectId(value);
    }
    throw new GraphQLError('Invalid ID');
  },
  parseLiteral(ast): Types.ObjectId {
    if (ast.kind === Kind.STRING && isObjectIdOrHexString(ast.value)) {
      return new Types.ObjectId(ast.value);
    }
    throw new GraphQLError('Invalid ID');
  },
});
