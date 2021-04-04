import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IWord } from 'src/app/core/interfaces/iword';
import { IWordsInCallGame, IWordTask } from './interfaces';
@Injectable({
  providedIn: 'root',
})
export class AudioCallService {
  baseURL = 'https://afternoon-falls-25894.herokuapp.com/words';

  constructor(private http: HttpClient) {}

  getWords(level, page) {
    return this.http.get(this.baseURL, { params: { group: level, page } });
  }

  createTasks(wordsArray: Array<IWord>): Array<IWordsInCallGame> {
    const shuffledArray = this.shuffleWords(wordsArray);
    const tasksArray = shuffledArray.map((element) => {
      const el = { word: element, isShown: false };
      return el;
    });
    return tasksArray;
  }

  shuffleWords(wordsArray: Array<IWord>): Array<IWord> {
    const newArr = wordsArray.sort(() => Math.random() - 0.5);
    return newArr;
  }

  createTask(wordsArray: Array<IWordsInCallGame>): IWordTask {
    const incorrectIndexes = this.createIncorrectIndexes();
    const incorrectWords = this.createIncorrectWords(incorrectIndexes, wordsArray);
    const correct = this.createCorrectIndex(wordsArray);
    const answers = this.createAnswers(wordsArray[correct].word.wordTranslate, incorrectWords);

    const task = {
      word: wordsArray[correct].word.word,
      translation: wordsArray[correct].word.wordTranslate,
      correctIndex: correct,
      voiceFile: wordsArray[correct].word.audioExample,
      incorrectWords,
      answers,
    };

    return task;
  }

  createIncorrectIndexes() {
    let incorrectIndexes = [];

    while (incorrectIndexes.length <= 3) {
      const randValue = Math.floor(20 * Math.random());
      if (incorrectIndexes.indexOf(randValue) < 0) {
        incorrectIndexes = [...incorrectIndexes, randValue];
      }
    }

    return incorrectIndexes;
  }

  createIncorrectWords(incorrectIndexes, wordsArray): string[] {
    let incorrectWords = [];

    for (let i = 0; i < incorrectIndexes.length; i += 1) {
      incorrectWords = [...incorrectWords, wordsArray[incorrectIndexes[i]].word.wordTranslate];
    }

    return incorrectWords;
  }

  createCorrectIndex(wordsArray) {
    let correct = Math.floor(20 * Math.random());
    while (wordsArray[correct].isShown === true) {
      correct = correct >= 19 ? 0 : (correct += 1);
    }

    return correct;
  }

  createAnswers(correct, incorrects) {
    const randomPosition = Math.floor(4 * Math.random());
    const answersArr = incorrects;
    answersArr.splice(randomPosition, 0, correct);

    return answersArr;
  }

  countShown(array) {
    const markedArr = array.filter((element) => element.isShown === false);
    if (markedArr.length <= 1) return true;
    return false;
  }
}
