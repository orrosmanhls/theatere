import { Model } from 'mongoose';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DocumentStatus, QueryRequest } from '@node-monorepo/types';

import { ItemsDocument, Items } from './items.schema';
import { CreateItemsDto } from './dto/create-items.dto';
import { UpdateItemsDto } from './dto/update-items.dto';
import { QueryBuilder } from '../../utils/query-builder';

@Injectable()
export class ItemsService {
  constructor(
    @InjectModel(Items.name)
    private readonly ItemsModel: Model<ItemsDocument>
  ) {}

  create(data: CreateItemsDto) {
    return this.ItemsModel.create(data);
  }

  createMany(data: CreateItemsDto[]) {
    if (data.length == 0) {
      throw new BadRequestException('Received empty array');
    }
    return this.ItemsModel.insertMany(data);
  }

  update(id: string, data: UpdateItemsDto) {
    return this.ItemsModel.updateOne({ _id: id }, data);
  }

  findAll() {
    return this.ItemsModel.find({ status: DocumentStatus.ACTIVE });
  }

  findOne(id: string) {
    return this.ItemsModel.findById(id);
  }

  delete(_id: string) {
    return this.ItemsModel.updateOne({ _id }, { status: DocumentStatus.DELETED });
  }

  search(query: QueryRequest) {
    const props = Object.keys(this.ItemsModel.schema.paths);
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
    return this.ItemsModel.aggregate(pipeline).skip(searchQuery.skip).limit(searchQuery.limit);
  }
}
