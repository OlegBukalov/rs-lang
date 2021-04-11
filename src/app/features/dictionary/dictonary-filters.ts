export const DICTIONARY_FILTERS = {
  studied: '{"userWord":{"$exists":"true"}}',
  hard: '{"$and":[{"userWord.difficulty":"hard},{"userWord":{"$exists":"true"}}]}',
  deleted: '{"userWord":{"$exists":"false"}}',
};
