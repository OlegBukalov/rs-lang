import { IDataUserGames } from './idata-user-games';

export interface IDataServerStatistics {
  id: number;
  optional: IDataUserGames;
  wordsPerDay: number;
}
