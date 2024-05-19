import { JwtService } from '@nestjs/jwt';
import { LogInUserInput } from '../dto/log-in-user.input';
import { UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { JWTToken } from '../dto/jwt-token-payload.dto';

export default async function logInUser(
  userInput: LogInUserInput,
): Promise<JWTToken> {
  const authService = this as AuthService;
  const user = await authService.checkUserCredentials(
    userInput.email,
    userInput.password,
  );

  if (user) {
    return this.sign(user);
  } else {
    throw new UnauthorizedException();
  }
}
