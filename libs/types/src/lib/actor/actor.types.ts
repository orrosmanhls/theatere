import { DocumentStatus } from './../enums';
import { Types } from 'mongoose';

export interface IActor {
  _id?: Types.ObjectId;
  status: DocumentStatus;
}
