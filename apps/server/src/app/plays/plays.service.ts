import { Model, Types } from 'mongoose';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DocumentStatus, QueryRequest } from '@node-monorepo/types';

import { PlaysDocument, Plays } from './plays.schema';
import { CreatePlayDto } from './dto/create-play.dto';
import { UpdatePlayDto } from './dto/update-play.dto';
import { QueryBuilder } from '../../utils/query-builder';
import { SearchPlayDto } from './dto/search-play.dto';

@Injectable()
export class PlaysService {
  constructor(
    @InjectModel(Plays.name)
    private readonly PlaysModel: Model<PlaysDocument>
  ) {}

  findAll() {
    return this.PlaysModel.find({ status: DocumentStatus.ACTIVE });
  }

  findOne(_id: string) {
    const objectId = new Types.ObjectId(_id);
    return this.PlaysModel.findById({ _id: objectId });
  }

  async create(data: CreatePlayDto) {
    const newPlay = await this.PlaysModel.create(data);
    return newPlay.toJSON();
  }

  update(_id, data: UpdatePlayDto) {
    const objectId = new Types.ObjectId(_id);
    return this.PlaysModel.updateOne({ _id: objectId }, data);
  }

  delete(_id: string) {
    const objectId = new Types.ObjectId(_id);
    return this.PlaysModel.updateOne({ _id: objectId }, { status: DocumentStatus.DELETED });
  }

  search(query: SearchPlayDto) {
    const props = Object.keys(this.PlaysModel.schema.paths);
    const searchQuery = new QueryBuilder()
      .queryTypeAggregation(true)
      .filter(query.filter)
      .searchFields({ word: query.search, searchableFields: props })
      .build();

    const pipeline = [
      { $match: { status: DocumentStatus.ACTIVE } },
      { ...searchQuery.filter },
      { ...searchQuery.search }
    ].filter((item: unknown) => Object.keys(item).length !== 0);
    console.log(JSON.stringify(pipeline));
    return this.PlaysModel.aggregate(pipeline);
  }
}
