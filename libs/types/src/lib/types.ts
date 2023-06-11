export interface QueryRequest {
  search?: string;
  filter?: { [key: string]: [string] };
  skip: number;
  limit: number;
  sort?: { [key: string]: 0 | -1 };
}
