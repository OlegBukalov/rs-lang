import { GameID } from '../../statistics/enums/game-id.enum';

export const MIN_SCREEN_WIDTH = 1150;
export const MAX_SCREEN_WIDTH = 1500;
export const MIN_COORDINATE_Y = 230;
export const MAX_COORDINATE_Y = 305;
export const STABILIZATION_FACTOR = 3;

export const STEP_Y = 1;
export const STEP_X = 6;
export const INVERTER = -1;
export const ANIMAL_WIDTH = 50;
export const START_COORDINATE_X = -150;
export const START_COORDINATE_Y = 50;
export const ONE_SCORE_POINT = 10;
export const MAX_WORDS_NUMBER = 4;
export const MAX_HEALTH = 5;
export const HEALTH_ICON_WIDTH = 40;
export const DEFAULT_LEVEL = 0;
export const LEVELS = [0, 1, 2, 3, 4, 5];

export const GAME_ID = GameID.Savannah;

export enum GameState {
  InProgress,
  Pending,
  Over,
}

export enum WordProperty {
  Russian = 'wordTranslate',
  English = 'word',
}
