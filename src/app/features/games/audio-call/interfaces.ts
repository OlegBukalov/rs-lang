import { IWord } from 'src/app/core/interfaces/iword';

export interface IWordsInCallGame {
  word: IWord;
  isShown: boolean;
}

export interface IWordTask {
  word: string;
  translation: string;
  correctIndex: number;
  voiceFile: string;
  incorrectWords: string[];
  answers: string[];
}
