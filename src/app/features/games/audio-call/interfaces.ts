import { IWord } from 'src/app/core/interfaces/iword';

export interface IGameState {
  level: number;
  page: number;
}

export interface ITask {
  answers: string[];
  correctAnswerIndex: number;
  correctAnswerWord: string;
  correctAnswerAudio: string;
}

export interface IWordChunk extends IWord {
  isShown: boolean;
}

export interface IGameResult {
  wordCounter: number;
  totalAnswersCounter: number;
  correctWordCounter: number;
  maxCorrectSequence: number;
  correctWords: IWord[];
  wordsWithMistakes: IWord[];
}
