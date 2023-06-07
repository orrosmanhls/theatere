/* eslint-disable @typescript-eslint/no-explicit-any */
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ItemsService } from '../items.service';
import { Items } from '../items.schema';
import { ItemsFactory } from './items.factory';

describe('ItemsService', () => {
  let service: ItemsService;
  let model: Model<Items>;

  const itemsData = ItemsFactory.build();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ItemsService,
        {
          provide: getModelToken('Items'),
          useValue: {
            new: jest.fn().mockResolvedValue(itemsData),
            constructor: jest.fn().mockResolvedValue(itemsData),
            findOne: jest.fn(),
            find: jest.fn(),
            findById: jest.fn(),
            updateOne: jest.fn(),
            updateMany: jest.fn(),
            aggregate: jest.fn(),
            schema: jest.fn(),
            path: jest.fn()
          }
        }
      ]
    }).compile();

    service = module.get<ItemsService>(ItemsService);
    model = module.get<Model<Items>>(getModelToken('Items'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all itemss', async () => {
    jest.spyOn(model, 'find').mockReturnValue([itemsData] as any);
    const allItems = await service.findAll();
    expect(allItems).toEqual([itemsData]);
  });

  it('should find items by id', async () => {
    jest.spyOn(model, 'findById').mockReturnValue(itemsData as any);
    const items = await service.findOne('sdfsdfsdfsdf');
    expect(items).toEqual(itemsData);
  });
  it('should delete items by id', async () => {
    jest.spyOn(model, 'updateOne').mockReturnValue(itemsData as any);
    jest.spyOn(model, 'findById').mockReturnValue(itemsData as any);
    const items = await service.delete('sdfsdfsd');
    expect(items).toEqual(itemsData);
    return;
  });
});
