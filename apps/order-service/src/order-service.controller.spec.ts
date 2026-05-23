import { Test, TestingModule } from '@nestjs/testing';
import { OrderServiceController } from './order-service.controller';
import { OrderServiceService } from './order-service.service';
import { PrismaService } from 'y/database';

describe('OrderServiceController', () => {
  let orderServiceController: OrderServiceController;

  const mockPrismaService = {
    user: {
      findMany: jest.fn(),
      create: jest.fn(),
    },
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [OrderServiceController],
      providers: [
        OrderServiceService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    orderServiceController = app.get<OrderServiceController>(OrderServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(orderServiceController.getHello()).toBe('Hello World!');
    });
  });
});
