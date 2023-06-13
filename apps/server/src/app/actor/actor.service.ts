import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DocumentStatus, QueryRequest } from '@node-monorepo/types';

import { ActorDocument, Actor } from './actor.schema';
import { CreateActorDto } from './dto/create-actor.dto';
import { UpdateActorDto } from './dto/update-actor.dto';
import { QueryBuilder } from '../../utils/query-builder';

@Injectable()
export class ActorService {
  constructor(
    @InjectModel(Actor.name)
    private readonly ActorModel: Model<ActorDocument>
  ) {}

  create(data: CreateActorDto) {
    return this.ActorModel.create(data);
  }

  update(id: string, data: UpdateActorDto) {
    return this.ActorModel.updateOne({ _id: id }, data);
  }

  findAll() {
    return this.ActorModel.find({ status: DocumentStatus.ACTIVE });
  }

  findOne(id: string) {
    return this.ActorModel.findById(id);
  }

  delete(_id: string) {
    return this.ActorModel.updateOne({ _id }, { status: DocumentStatus.DELETED });
  }

  search(query: QueryRequest) {
    const props = Object.keys(this.ActorModel.schema.paths);

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
    return this.ActorModel.aggregate(pipeline).skip(searchQuery.skip).limit(searchQuery.limit);
  }
}
