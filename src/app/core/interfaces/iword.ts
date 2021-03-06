import { DictionaryCategory } from 'src/app/features/dictionary/dictionary-category';
import { IUserWord } from './iuser-word';

export interface IWord {
  // TODO: разобраться с id и _id
  id?: string;
  _id?: string;
  group: number;
  page: number;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  textExampleTranslate: string;
  textMeaningTranslate: string;
  wordTranslate: string;
  wordsPerExampleSentence: number;
  status?: DictionaryCategory;
  userWord?: IUserWord;
}
