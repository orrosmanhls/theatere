import { Test, TestingModule } from '@nestjs/testing';
import { getMockRes } from '@jest-mock/express';

import { HealthController } from '../health.controller';

const { res } = getMockRes();

describe('HealthController', () => {
  let healthController: HealthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController]
    }).compile();

    healthController = module.get<HealthController>(HealthController);
  });
  it('should be defined', () => {
    expect(healthController).toBeDefined();
  });

  it('should return 200 OK', async () => {
    await healthController.health(res);
    expect(res.sendStatus).toHaveBeenCalledWith(200);
  });
});
