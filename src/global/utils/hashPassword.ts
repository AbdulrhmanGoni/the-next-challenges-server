import { hash } from 'bcrypt';

export default async function hashPassword(password: string) {
  const { PASSWORDS_HASHING_ROUNDS = 10 } = process.env;
  return await hash(password, +PASSWORDS_HASHING_ROUNDS);
}
