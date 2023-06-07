import { Test, TestingModule } from '@nestjs/testing';
import { UsersEntity } from '../entities/users.entity';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';
import { UsersFactory } from './users.factory';

describe('UsersController', () => {
  let usersController: UsersController;
  const paramId = '1';
  const usersData = UsersFactory.build({ _id: paramId });

  const mockUsersService = {
    update: jest.fn(async () => {
      return UsersEntity;
    }),
    delete: jest.fn(async () => {
      return UsersEntity;
    }),
    findOne: jest.fn(async () => {
      return UsersEntity;
    }),
    create: jest.fn(async () => {
      return UsersEntity;
    }),
    findAll: jest.fn(async () => {
      return [UsersEntity];
    })
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [UsersController],
      providers: [UsersService]
    })
      .overrideProvider(UsersService)
      .useValue(mockUsersService)
      .compile();

    usersController = module.get<UsersController>(UsersController);
  });
  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });

  it('should get all', async () => {
    expect(await usersController.getAll()).toEqual([UsersEntity]);
  });
  it('should create one', async () => {
    expect(await usersController.create(usersData)).toEqual(UsersEntity);
  });
  it('should update user', async () => {
    expect(await usersController.update(paramId, usersData)).toEqual(UsersEntity);
  });
  it('should get user by id', async () => {
    expect(await usersController.findOne(paramId)).toEqual(UsersEntity);
  });
  it('should delete user', async () => {
    expect(await usersController.delete(paramId)).toEqual(UsersEntity);
  });
});
