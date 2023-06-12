import { Test, TestingModule } from '@nestjs/testing';
import { ShowEntity } from '../entities/show.entity';
import { ShowController } from '../show.controller';
import { ShowService } from '../show.service';
import { ShowFactory } from './show.factory';

describe('ShowController', () => {
  let showController: ShowController;
  const paramId = '1';
  const showData = ShowFactory.build({ _id: paramId });

  const mockShowService = {
    update: jest.fn(async () => {
      return ShowEntity;
    }),
    delete: jest.fn(async () => {
      return ShowEntity;
    }),
    findOne: jest.fn(async () => {
      return ShowEntity;
    }),
    create: jest.fn(async () => {
      return ShowEntity;
    }),
    findAll: jest.fn(async () => {
      return [ShowEntity];
    })
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [ShowController],
      providers: [ShowService]
    })
      .overrideProvider(ShowService)
      .useValue(mockShowService)
      .compile();

    showController = module.get<ShowController>(ShowController);
  });
  it('should be defined', () => {
    expect(showController).toBeDefined();
  });

  it('should get all', async () => {
    expect(await showController.findAll()).toEqual([ShowEntity]);
  });
  it('should create one', async () => {
    expect(await showController.create(showData)).toEqual(ShowEntity);
  });
  it('should update user', async () => {
    expect(await showController.update(paramId, showData)).toEqual(ShowEntity);
  });
  it('should get user by id', async () => {
    expect(await showController.findOne(paramId)).toEqual(ShowEntity);
  });
  it('should delete user', async () => {
    expect(await showController.delete(paramId)).toEqual(ShowEntity);
  });
});
