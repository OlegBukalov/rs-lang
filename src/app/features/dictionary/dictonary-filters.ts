import { DictionaryCategory } from './dictionary-category';

export const DICTIONARY_FILTERS = {
  studied: '{"userWord.optional.category":"studied"}',
  hard: '{"userWord.optional.category":"hard"}',
  deleted: '{"userWord.optional.category":"deleted"}',
};

export function getCategoryBody(category: DictionaryCategory) {
  let categoryName = '';
  switch (category) {
    case DictionaryCategory.Studied:
      categoryName = 'studied';
      break;
    case DictionaryCategory.Hard:
      categoryName = 'hard';
      break;
    case DictionaryCategory.Deleted:
      categoryName = 'deleted';
      break;
    default:
      categoryName = '';
      break;
  }
  return {
    optional: {
      category: categoryName,
    },
  };
}
