import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LogInUserInput } from './dto/log-in-user.input';
import { SignUpUserInput } from './dto/sign-up-user.input';
import { JWT } from './dto/auth-related.dto';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => JWT, { nullable: true })
  async logInUser(@Args('logInUserInput') logInUserInput: LogInUserInput) {
    return this.authService.logInUser(logInUserInput);
  }

  @Mutation(() => JWT, { nullable: true })
  async signUpUser(@Args('signUpUserInput') signUpUserInput: SignUpUserInput) {
    return this.authService.signUpUser(signUpUserInput);
  }
}
