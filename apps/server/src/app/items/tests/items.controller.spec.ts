import { Test, TestingModule } from '@nestjs/testing';
import { ItemsEntity } from '../entities/items.entity';
import { ItemsController } from '../items.controller';
import { ItemsService } from '../items.service';
import { ItemsFactory } from './items.factory';

describe('ItemsController', () => {
  let itemsController: ItemsController;
  const paramId = '1';
  const itemsData = ItemsFactory.build({ _id: paramId });

  const mockItemsService = {
    update: jest.fn(async () => {
      return ItemsEntity;
    }),
    delete: jest.fn(async () => {
      return ItemsEntity;
    }),
    findOne: jest.fn(async () => {
      return ItemsEntity;
    }),
    create: jest.fn(async () => {
      return ItemsEntity;
    }),
    findAll: jest.fn(async () => {
      return [ItemsEntity];
    })
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [ItemsController],
      providers: [ItemsService]
    })
      .overrideProvider(ItemsService)
      .useValue(mockItemsService)
      .compile();

    itemsController = module.get<ItemsController>(ItemsController);
  });
  it('should be defined', () => {
    expect(itemsController).toBeDefined();
  });

  it('should get all', async () => {
    expect(await itemsController.findAll()).toEqual([ItemsEntity]);
  });
  it('should create one', async () => {
    expect(await itemsController.create(itemsData)).toEqual(ItemsEntity);
  });
  it('should update user', async () => {
    expect(await itemsController.update(paramId, itemsData)).toEqual(ItemsEntity);
  });
  it('should get user by id', async () => {
    expect(await itemsController.findOne(paramId)).toEqual(ItemsEntity);
  });
  it('should delete user', async () => {
    expect(await itemsController.delete(paramId)).toEqual(ItemsEntity);
  });
});
