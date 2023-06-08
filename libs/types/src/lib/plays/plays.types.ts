import { Genres } from './plays.enum';

export interface IPlay {
  _id?: string;
  name: string;
  genre: Genres;
}
