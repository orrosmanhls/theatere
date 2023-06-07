import { Model } from 'mongoose';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DocumentStatus, QueryRequest } from '@node-monorepo/types';

import { UsersDocument, Users } from './users.schema';
import { CreateUsersDto } from './dto/create-users.dto';
import { UpdateUsersDto } from './dto/update-users.dto';
import { QueryBuilder } from '../../utils/query-builder';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name)
    private readonly UsersModel: Model<UsersDocument>
  ) {}

  create(data: CreateUsersDto) {
    return this.UsersModel.create(data);
  }

  createMany(data: CreateUsersDto[]) {
    if (data.length == 0) {
      throw new BadRequestException('Received empty array');
    }
    return this.UsersModel.insertMany(data);
  }

  update(id: string, data: UpdateUsersDto) {
    return this.UsersModel.updateOne({ _id: id }, data);
  }

  findAll() {
    return this.UsersModel.find({ status: DocumentStatus.ACTIVE });
  }

  findOne(id: string) {
    return this.UsersModel.findById(id);
  }

  delete(_id: string) {
    return this.UsersModel.updateOne({ _id }, { status: DocumentStatus.DELETED });
  }

  search(query: QueryRequest) {
    const props = Object.keys(this.UsersModel.schema.paths);
    //Return search fields in query
    const searchQuery = new QueryBuilder()
      .queryTypeAggregation(true)
      .filter(query.filter)
      .searchFields({ word: query.search, searchableFields: props })
      .limit(query.limit)
      .skip(query.skip)
      .sort(query.sort)
      .build();

    const pipeline = [
      { $match: { status: DocumentStatus.ACTIVE } },
      { ...searchQuery.filter },
      { ...searchQuery.search },
      { ...searchQuery.sort }
    ]
      //Filter empty query objects
      .filter((item: unknown) => Object.keys(item).length !== 0);
    return this.UsersModel.aggregate(pipeline).skip(searchQuery.skip).limit(searchQuery.limit);
  }
}
