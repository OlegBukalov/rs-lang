import { IWord } from './iword';

interface ITotalCount {
  count: number;
}

export interface IWordPage {
  paginatedResults: IWord[];
  totalCount: ITotalCount[];
}
