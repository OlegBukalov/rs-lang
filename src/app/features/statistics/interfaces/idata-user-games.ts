import { IItemListGames } from './iitem-list-games';

interface IDataResultUserGames {
  dataGameItems: IItemListGames[];
  percentAllRightAnswers: number;
}

export interface IDataUserGames {
  currentDay: string;
  dataGames: IDataResultUserGames;
  // TO DO data on the number of correct and incorrect answers in games (words)
}
