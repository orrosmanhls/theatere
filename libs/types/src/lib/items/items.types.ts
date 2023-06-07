import { DocumentStatus } from './../enums';
import { Types } from 'mongoose';

export interface IItems {
  _id?: Types.ObjectId;
  status: DocumentStatus;
}
