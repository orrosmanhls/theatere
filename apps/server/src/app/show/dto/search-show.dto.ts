import { IsOptional, IsString, Max } from 'class-validator';

export class SearchShowDto {
  @IsOptional()
  @Max(50)
  limit?: number;

  @IsOptional()
  skip?: number;

  @IsOptional()
  filter: unknown;

  @IsString()
  @IsOptional()
  search?: string;
}
