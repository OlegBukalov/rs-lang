import { BonusScoreLvl } from '../enums/bonus-score-lvls.enum';

export const TextByLevel = {
  [BonusScoreLvl.First]: '',
  [BonusScoreLvl.Second]: '+20 очков за слово',
  [BonusScoreLvl.Third]: '+40 очков за слово',
  [BonusScoreLvl.Fourth]: '+80 очков за слово',
};
