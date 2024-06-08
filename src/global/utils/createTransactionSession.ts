import { InternalServerErrorException } from '@nestjs/common';
import { ClientSession, Connection } from 'mongoose';

export default async function createTransactionSession() {
  const mongodbConnection = this.connection as Connection;

  let session: ClientSession;
  try {
    session = await mongodbConnection.startSession();
    session.startTransaction();
  } catch {
    throw new InternalServerErrorException();
  }
  return session;
}
