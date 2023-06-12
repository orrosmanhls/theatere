import { DocumentStatus } from './../enums';
import { Types } from 'mongoose';

export interface IShow {
  _id?: Types.ObjectId;
  status: DocumentStatus;
}
