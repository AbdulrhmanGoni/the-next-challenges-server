import { TestingModule } from '@nestjs/testing';
import { PostsService } from '../../../src/posts/posts.service';
import { UsersModule } from '../../../src/users/users.module';
import { forwardRef } from '@nestjs/common';
import { Post, PostSchema } from '../../../src/posts/schemas/post.schema';
import createTestingService from '../../createTestingService';

describe('PostsService', () => {
  let app: TestingModule;
  let service: PostsService;

  beforeEach(async () => {
    const factory = await createTestingService<PostsService>({
      MainService: PostsService,
      imports: [forwardRef(() => UsersModule)],
      databaseModel: { name: Post.name, schema: PostSchema },
    });
    app = factory.app;
    service = factory.service;
  });

  afterAll(async () => {
    app?.close();
  });

  it('`createPost` method should be defined', () => {
    expect(service.createPost).toBeDefined();
  });

  it('`findPostById` method should be defined', () => {
    expect(service.findPostById).toBeDefined();
  });

  it('`findPosts` method should be defined', () => {
    expect(service.findPosts).toBeDefined();
  });

  it('`editPost` method should be defined', () => {
    expect(service.editPost).toBeDefined();
  });
});
