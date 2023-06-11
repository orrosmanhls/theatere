import { Types } from 'mongoose';
import { Genres } from './plays.enum';
import { DocumentStatus } from '../enums';

export interface IPlay {
  _id?: Types.ObjectId;
  name: string;
  genre: Genres;
  status: DocumentStatus;
}
