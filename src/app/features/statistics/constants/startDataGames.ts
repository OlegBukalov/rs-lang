import { IItemListGames } from '../interfaces/iitem-list-games';
import { GameID } from '../enums/game-id.enum';

export const START_DATA_GAMES: IItemListGames[] = [
  {
    game: GameID.Savannah,
    data: {
      name: 'Саванна',
      countAnswers: 0,
      countRightAnswers: 0,
      percentRightAnswers: 0,
      maxRightAnswers: 0,
    },
  },
  {
    game: GameID.AudioCall,
    data: {
      name: 'Аудиовызов',
      countAnswers: 0,
      countRightAnswers: 0,
      percentRightAnswers: 0,
      maxRightAnswers: 0,
    },
  },
  {
    game: GameID.Sprint,
    data: {
      name: 'Спринт',
      countAnswers: 0,
      countRightAnswers: 0,
      percentRightAnswers: 0,
      maxRightAnswers: 0,
    },
  },
  {
    game: GameID.CardGame,
    data: {
      name: 'Своя игра',
      countAnswers: 0,
      countRightAnswers: 0,
      percentRightAnswers: 0,
      maxRightAnswers: 0,
    },
  },
];
