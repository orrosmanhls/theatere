import { DocumentStatus } from './../enums';
import { Types } from 'mongoose';

export interface IShow {
  _id?: Types.ObjectId;
  status: DocumentStatus;
  playId: Types.ObjectId;
  actors: Types.ObjectId[];
  hall: string;
  date: Date;
  seats: number;
  availableSeats: number;
}
