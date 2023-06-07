/* eslint-disable @typescript-eslint/no-explicit-any */
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersService } from '../users.service';
import { Users } from '../users.schema';
import { UsersFactory } from './users.factory';

describe('UsersService', () => {
  let service: UsersService;
  let model: Model<Users>;

  const usersData = UsersFactory.build();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken('Users'),
          useValue: {
            new: jest.fn().mockResolvedValue(usersData),
            constructor: jest.fn().mockResolvedValue(usersData),
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

    service = module.get<UsersService>(UsersService);
    model = module.get<Model<Users>>(getModelToken('Users'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all userss', async () => {
    jest.spyOn(model, 'find').mockReturnValue([usersData] as any);
    const allUsers = await service.findAll();
    expect(allUsers).toEqual([usersData]);
  });

  it('should find users by id', async () => {
    jest.spyOn(model, 'findById').mockReturnValue(usersData as any);
    const users = await service.findOne('sdfsdfsdfsdf');
    expect(users).toEqual(usersData);
  });
  it('should delete users by id', async () => {
    jest.spyOn(model, 'updateOne').mockReturnValue(usersData as any);
    jest.spyOn(model, 'findById').mockReturnValue(usersData as any);
    const users = await service.delete('sdfsdfsd');
    expect(users).toEqual(usersData);
    return;
  });
});
