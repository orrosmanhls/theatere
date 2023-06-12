import { DocumentStatus } from './../enums';
import { Types } from 'mongoose';

export interface IActor {
  firstName: string;
  lastName: string;
  age?: number;
  _id?: Types.ObjectId;
  status: DocumentStatus;
}
