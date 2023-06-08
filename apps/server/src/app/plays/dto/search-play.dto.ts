import { IsOptional, IsString, Max } from 'class-validator';

export class SearchPlayDto {
  @IsOptional()
  filter?: unknown;

  @IsString()
  @IsOptional()
  search?: string;
}
