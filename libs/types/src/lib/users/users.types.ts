import { DocumentStatus } from './../enums';
import { Types } from 'mongoose';
import { UserRole } from './users.enums';

export interface IUser {
  _id?: Types.ObjectId;
  firstName: string;
  lastName: string;
  phone?: string;
  email?: string;
  address?: string;
  status: DocumentStatus;
  role: UserRole;
}
