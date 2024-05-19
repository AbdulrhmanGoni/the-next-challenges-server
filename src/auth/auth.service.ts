import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from '../users/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import signUpUser from './services/signUpUser';
import logInUser from './services/logInUser';
import checkUserCredentials from './services/checkUserCredentials';
import { JWTToken, JWTTokenPayload } from './dto/jwt-token-payload.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private UserModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  signUpUser = signUpUser;
  logInUser = logInUser;
  checkUserCredentials = checkUserCredentials;
  sign(payload: JWTTokenPayload): JWTToken {
    return { accessToken: this.jwtService.sign(payload) };
  }
}
