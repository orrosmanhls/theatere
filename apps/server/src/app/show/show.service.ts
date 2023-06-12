import { Model } from 'mongoose';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DocumentStatus, QueryRequest } from '@node-monorepo/types';

import { ShowDocument, Show } from './show.schema';
import { CreateShowDto } from './dto/create-show.dto';
import { UpdateShowDto } from './dto/update-show.dto';
import { QueryBuilder } from '../../utils/query-builder';

@Injectable()
export class ShowService {
  constructor(
    @InjectModel(Show.name)
    private readonly ShowModel: Model<ShowDocument>
  ) {}

  create(data: CreateShowDto) {
    return this.ShowModel.create(data);
  }

  createMany(data: CreateShowDto[]) {
    if (data.length == 0) {
      throw new BadRequestException('Received empty array');
    }
    return this.ShowModel.insertMany(data);
  }

  update(id: string, data: UpdateShowDto) {
    return this.ShowModel.updateOne({ _id: id }, data);
  }

  findAll() {
    return this.ShowModel.find({ status: DocumentStatus.ACTIVE });
  }

  findOne(id: string) {
    return this.ShowModel.findById(id);
  }

  delete(_id: string) {
    return this.ShowModel.updateOne({ _id }, { status: DocumentStatus.DELETED });
  }

  search(query: QueryRequest) {
    const props = Object.keys(this.ShowModel.schema.paths);
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
    return this.ShowModel.aggregate(pipeline).skip(searchQuery.skip).limit(searchQuery.limit);
  }
}
