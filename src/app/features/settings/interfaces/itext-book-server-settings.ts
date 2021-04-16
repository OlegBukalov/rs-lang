import { ITextBookSettings } from './itext-book-settings';

export interface ITextBookServerSettings {
  id: number;
  optional: ITextBookSettings;
  wordsPerDay: number;
}
