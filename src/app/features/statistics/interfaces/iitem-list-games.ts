import { GameID } from '../enums/game-id.enum';
import { IDataGame } from './idata-game';

export interface IItemListGames {
  game: GameID;
  data: IDataGame;
}
