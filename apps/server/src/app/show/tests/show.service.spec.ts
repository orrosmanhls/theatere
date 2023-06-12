/* eslint-disable @typescript-eslint/no-explicit-any */
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ShowService } from '../show.service';
import { Show } from '../show.schema';
import { ShowFactory } from './show.factory';

describe('ShowService', () => {
  let service: ShowService;
  let model: Model<Show>;

  const showData = ShowFactory.build();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ShowService,
        {
          provide: getModelToken('Show'),
          useValue: {
            new: jest.fn().mockResolvedValue(showData),
            constructor: jest.fn().mockResolvedValue(showData),
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

    service = module.get<ShowService>(ShowService);
    model = module.get<Model<Show>>(getModelToken('Show'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all shows', async () => {
    jest.spyOn(model, 'find').mockReturnValue([showData] as any);
    const allShow = await service.findAll();
    expect(allShow).toEqual([showData]);
  });

  it('should find show by id', async () => {
    jest.spyOn(model, 'findById').mockReturnValue(showData as any);
    const show = await service.findOne('sdfsdfsdfsdf');
    expect(show).toEqual(showData);
  });
  it('should delete show by id', async () => {
    jest.spyOn(model, 'updateOne').mockReturnValue(showData as any);
    jest.spyOn(model, 'findById').mockReturnValue(showData as any);
    const show = await service.delete('sdfsdfsd');
    expect(show).toEqual(showData);
    return;
  });
});
