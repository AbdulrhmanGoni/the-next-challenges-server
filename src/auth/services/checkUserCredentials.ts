import { Model } from 'mongoose';
import { User } from '../../users/schemas/user.schema';
import { compare } from 'bcrypt';
import { InternalServerErrorException } from '@nestjs/common';
import { JWTPayload } from '../dto/auth-related.dto';

export default async function checkUserCredentials(
  email: string,
  password: string,
): Promise<JWTPayload | null> {
  const UserModel = this.UserModel as Model<User>;
  try {
    const user = await UserModel.findOne({ email }, [
      'email',
      'password',
      'role',
    ]);
    if (user) {
      const passwordMatched = await compare(password, user.password);
      if (passwordMatched) {
        return { id: user.id, email: user.email, role: user.role };
      }
    }
    return null;
  } catch {
    throw new InternalServerErrorException();
  }
}
