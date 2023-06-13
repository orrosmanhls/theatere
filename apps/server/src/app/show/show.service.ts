import { Model } from 'mongoose';
import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DocumentStatus, IShow, QueryRequest } from '@node-monorepo/types';

import { ShowDocument, Show } from './show.schema';
import { CreateShowDto } from './dto/create-show.dto';
import { UpdateShowDto } from './dto/update-show.dto';
import { QueryBuilder } from '../../utils/query-builder';
import { PurchaseDto } from './dto/purchase.dto';
import { CancelDto } from './dto/cancel.dto';

@Injectable()
export class ShowService {
  constructor(
    @InjectModel(Show.name)
    private readonly ShowModel: Model<ShowDocument>
  ) {}

  create(data: CreateShowDto) {
    return this.ShowModel.create(data);
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

  async purchase(_id: string, data: PurchaseDto) {
    const show: IShow = await this.ShowModel.findById(_id).lean().exec();
    if (!show) {
      throw new NotFoundException();
    }
    if (data.amount > show.availableSeats) {
      throw new BadRequestException('');
    }
    return this.ShowModel.updateOne({ _id }, { availableSeats: show.availableSeats - data.amount });
  }

  async cancel(_id: string, data: CancelDto) {
    const show: IShow = await this.ShowModel.findById(_id).lean().exec();
    if (!show) {
      throw new NotFoundException();
    }
    if (data.amount > show.seats - show.availableSeats) {
      throw new BadRequestException('');
    }
    return this.ShowModel.updateOne({ _id }, { availableSeats: show.availableSeats + data.amount });
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
