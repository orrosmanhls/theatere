/* eslint-disable @typescript-eslint/no-explicit-any */
// TODO: add types and remove allow any
import * as mongoose from 'mongoose';
import { mapObjIndexed } from 'ramda';

export interface ISearchQuery {
  word: string;
  searchableFields?: string[];
}

export interface IQuery {
  search?: any;
  filter?: any;
  sort?: any;
  skip: number;
  limit: number;
}

export class QueryBuilder {
  private readonly _query: IQuery = {
    search: {},
    filter: {},
    sort: {},
    skip: 0,
    limit: 50
  };
  private _aggregation = false;

  public build(): IQuery {
    return this._query;
  }

  queryTypeAggregation(aggregation: boolean) {
    this._aggregation = aggregation;
    return this;
  }

  skip(skip: number) {
    this._query.skip = Number(skip);
    return this;
  }

  limit(limit: number) {
    this._query.limit = Number(limit);
    return this;
  }

  searchFields(searchQuery?: ISearchQuery) {
    if (searchQuery && searchQuery.word && searchQuery.searchableFields) {
      const search: any = [];
      //Add all fields to word search in
      searchQuery.searchableFields.forEach((field: any) => {
        const searchFieldsArr: any = {};
        searchFieldsArr[field] = {
          $regex: `.*${searchQuery.word.trim()}.*`,
          $options: 'i'
        };
        search.push(searchFieldsArr);
      });
      this._query.search = this._aggregation
        ? { $match: { $or: [...search] } }
        : { $or: [...search] };
    }
    return this;
  }

  filter(filter: any) {
    const fields = Object.keys(filter);
    if (fields.length > 0) {
      fields.forEach((item: string) => {
        filter[`${item}`] = { $in: filter[`${item}`] };
      });
      this._query.filter = this._aggregation
        ? { $match: { ...parseQuery(filter) } }
        : { ...parseQuery(filter) };
    }
    return this;
  }

  sort(sort: any) {
    if (sort) {
      //Fix sort value
      Object.keys(sort).forEach(function (key) {
        sort[key] = sort[key] == 0 ? -1 : 1;
      });
      this._query.sort = this._aggregation ? { $sort: { ...sort } } : { ...sort };
    }
    return this;
  }
}

const isObjectId = (v: any) => mongoose.Types.ObjectId.isValid(v);
const toObjectId = (v: any) => new mongoose.Types.ObjectId(v);
const isPrimitiveType = (v: any) =>
  typeof v === 'boolean' ||
  typeof v === 'number' ||
  typeof v === 'undefined' ||
  v === null ||
  v instanceof RegExp ||
  typeof v === 'string' ||
  v instanceof Date;

const parseValue: any = (v: any) => {
  return isObjectId(v) && typeof v !== 'number'
    ? toObjectId(v)
    : isPrimitiveType(v)
    ? v
    : parseQuery(v);
};

export const parseQuery = (q: any) =>
  Array.isArray(q) ? q.map(parseValue) : mapObjIndexed(parseValue, q);
