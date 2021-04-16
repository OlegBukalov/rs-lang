import { IWord } from 'src/app/core/interfaces/iword';

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
  correctWordCounter: number;
  maxCorrectSequence: number;
}