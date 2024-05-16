import { TestingModule } from '@nestjs/testing';
import { UsersService } from '../../../src/users/users.service';
import { PostsModule } from '../../../src/posts/posts.module';
import { forwardRef } from '@nestjs/common';
import { User, UserSchema } from '../../../src/users/schemas/user.schema';
import createTestingService from '../../createTestingService';

describe('UsersService', () => {
  let app: TestingModule;
  let service: UsersService;

  beforeEach(async () => {
    const factory = await createTestingService<UsersService>({
      MainService: UsersService,
      imports: [forwardRef(() => PostsModule)],
      databaseModel: { name: User.name, schema: UserSchema },
    });
    app = factory.app;
    service = factory.service;
  });

  afterAll(async () => {
    app?.close();
  });

  it('`signUpUser` method should be defined', () => {
    expect(service.signUpUser).toBeDefined();
  });

  it('`findUserById` method should be defined', () => {
    expect(service.findUserById).toBeDefined();
  });

  it('`findUsers` method should be defined', () => {
    expect(service.findUsers).toBeDefined();
  });

  it('`updateUserData` method should be defined', () => {
    expect(service.updateUserData).toBeDefined();
  });
});
