import { DictionaryCategory } from './dictionary-category';

export const namesByCategory = {
  [DictionaryCategory.Studied]: 'studied',
  [DictionaryCategory.Hard]: 'hard',
  [DictionaryCategory.Deleted]: 'deleted',
};

export const categoryByName = {
  studied: DictionaryCategory.Studied,
  hard: DictionaryCategory.Hard,
  deleted: DictionaryCategory.Deleted,
};
