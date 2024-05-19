import { Injectable } from '@nestjs/common';
import { findUserById, findUsers, updateUserData } from './services';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private UserModel: Model<User>) {}

  findUsers = findUsers;

  findUserById = findUserById;

  updateUserData = updateUserData;
}
