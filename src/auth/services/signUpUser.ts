import { Model } from 'mongoose';
import { User } from '../../users/schemas/user.schema';
import { SignUpUserInput } from '../dto/sign-up-user.input';
import { hash } from 'bcrypt';
import { roles } from '../../constants/users-roles';
import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { JWTToken } from '../dto/auth-related.dto';

export default async function signUpUser(
  userInput: SignUpUserInput,
): Promise<JWTToken> {
  const UserModel = this.UserModel as Model<User>;
  let isUserExist = false;
  try {
    isUserExist = !!(await UserModel.findOne({ email: userInput.email }, [
      '_id',
    ]));
  } catch {
    throw new InternalServerErrorException();
  }

  if (isUserExist) {
    throw new BadRequestException('This email is already regitered');
  }

  try {
    const { PASSWORDS_HASHING_ROUNDS = 10 } = process.env;
    const hashedPassword = await hash(
      userInput.password,
      +PASSWORDS_HASHING_ROUNDS,
    );
    const newUser = new UserModel({ ...userInput, password: hashedPassword });
    await newUser.save();

    return this.sign({
      id: newUser.id,
      email: newUser.email,
      role: roles.USER,
    });
  } catch {
    throw new InternalServerErrorException();
  }
}
