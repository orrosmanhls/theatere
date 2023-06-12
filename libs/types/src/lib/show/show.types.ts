import { DocumentStatus } from './../enums';
import { ObjectId, Types } from 'mongoose';

export interface IShow {
  _id?: Types.ObjectId;
  status: DocumentStatus;
  playId: Types.ObjectId;
  actors: ObjectId[];
  hall: string;
  date: Date;
  seats: number;
}
