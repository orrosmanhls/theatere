import { Request } from 'express';
import { GetUserCommandOutput } from '@aws-sdk/client-cognito-identity-provider';
export interface QueryRequest {
  search?: string;
  filter?: { [key: string]: [string] };
  skip: number;
  limit: number;
  sort?: { [key: string]: 0 | -1 };
}
