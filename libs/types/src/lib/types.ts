import { IUser } from './users/users.types';
import { Request } from 'express';
import { GetUserCommandOutput } from '@aws-sdk/client-cognito-identity-provider';
export interface QueryRequest {
  search?: string;
  filter?: { [key: string]: string };
  skip: number;
  limit: number;
  sort?: { [key: string]: 0 | -1 };
}

export interface AuthenticatedRequest extends Request {
  user: IUser | GetUserCommandOutput;
}
