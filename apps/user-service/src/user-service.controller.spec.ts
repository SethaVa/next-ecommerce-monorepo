import { Test, TestingModule } from '@nestjs/testing';
import { UserServiceController } from './user-service.controller';
import { UserServiceService } from './user-service.service';
import { PrismaService } from 'y/database';

describe('UserServiceController', () => {
  let userServiceController: UserServiceController;

  const mockPrismaService = {
    user: {
      findMany: jest.fn(),
      create: jest.fn(),
    },
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserServiceController],
      providers: [
        UserServiceService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    userServiceController = app.get<UserServiceController>(UserServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(userServiceController.getHello()).toBe('Hello World!');
    });
  });
});
