import { IWord } from 'src/app/core/interfaces/iword';

export interface IWordsInCallGame {
  words: IWord;
  isShown: boolean;
}

export interface IWordTask {
  word: string;
  voiceFile: string;
  incorrectWords: string[];
}
