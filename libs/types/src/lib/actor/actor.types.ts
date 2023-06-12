import { DocumentStatus } from './../enums';
import { Types } from 'mongoose';

export interface IActor {
  firstName: String;
  lastName: String;
  age?: Number;
  _id?: Types.ObjectId;
  status: DocumentStatus;
}
