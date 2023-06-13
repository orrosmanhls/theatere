import { QueryRequest } from '@node-monorepo/types';
import { IsOptional, IsString, Max } from 'class-validator';

export class SearchShowDto {
  @IsOptional()
  @Max(50)
  limit?: number;

  @IsOptional()
  skip?: number;

  @IsOptional()
  filter: QueryRequest['filter'];

  @IsString()
  @IsOptional()
  search?: string;
}
