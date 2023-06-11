import { IsOptional, IsString } from 'class-validator';
import { QueryRequest } from '@node-monorepo/types';

export class SearchPlayDto {
  @IsOptional()
  filter?: QueryRequest['filter'];

  @IsString()
  @IsOptional()
  search?: string;
}
