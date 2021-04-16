import { IWord } from './iword';

export interface IWordPage {
  paginatedResults: IWord[];
  totalCount: [
    {
      count: number;
    },
  ];
}
