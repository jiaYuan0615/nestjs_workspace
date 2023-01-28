import { Test, TestingModule } from '@nestjs/testing';
import { EcommerceController } from './ecommerce.controller';
import { EcommerceService } from './ecommerce.service';

describe('EcommerceController', () => {
  let ecommerceController: EcommerceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [EcommerceController],
      providers: [EcommerceService],
    }).compile();

    ecommerceController = app.get<EcommerceController>(EcommerceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(ecommerceController.getHello()).toBe('Hello World!');
    });
  });
});
