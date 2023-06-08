import { IsOptional, IsString } from 'class-validator';

export class SearchPlayDto {
  @IsOptional()
  filter?: unknown;

  @IsString()
  @IsOptional()
  search?: string;
}
