import { TestingModule } from '@nestjs/testing';
import { AuthService } from '../../../src/auth/auth.service';
import { User, UserSchema } from '../../../src/users/schemas/user.schema';
import { JwtStrategy } from '../../../src/auth/strategies/jwt.strategy';
import createTestingService from '../../createTestingService';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

describe('AuthService', () => {
  let app: TestingModule;
  let service: AuthService;

  beforeEach(async () => {
    const factory = await createTestingService<AuthService>({
      MainService: AuthService,
      imports: [
        PassportModule,
        JwtModule.register({
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: '30d' },
        }),
      ],
      providers: [JwtStrategy],
      databaseModel: { name: User.name, schema: UserSchema },
    });
    app = factory.app;
    service = factory.service;
  });

  afterAll(async () => {
    app.close();
  });

  it('`signUpUser` method should be defined', async () => {
    expect(service.signUpUser).toBeDefined();
  });

  it('`logInUser` method should be defined', async () => {
    expect(service.logInUser).toBeDefined();
  });

  it('`checkUserCredentials` method should be defined', async () => {
    expect(service.checkUserCredentials).toBeDefined();
  });

  it('`sign` method should be defined', async () => {
    expect(service.sign).toBeDefined();
  });
});
