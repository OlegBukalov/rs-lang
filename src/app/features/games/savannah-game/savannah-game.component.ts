import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IWord } from 'src/app/core/interfaces/iword';
import { WordsApiService } from 'src/app/core/services/wordsApi.service';

@Component({
  selector: 'app-savannah-game',
  templateUrl: './savannah-game.component.html',
  styleUrls: ['./savannah-game.component.scss'],
})
export class SavannahGameComponent implements OnInit, OnDestroy {
  level = 1;

  wordsList: string[] = [
    'agree',
    'alcohol',
    'boat',
    'car',
    'bridge',
    'master',
    'application',
    'ball',
    'cow',
    'arrow',
    // 'world',
    // 'logic',
    // 'wizard',
    // 'mail',
    // 'cheese',
    // 'rat',
    // 'sword',
    // 'generator',
    // 'oil',
    // 'ten',
  ];

  realWordsList: IWord[] = [];

  learnedWords: IWord[];

  unlearnedWords: IWord[];

  wordsForRoundList: IWord[] = [];

  targetWord: IWord;

  answerWordsArray: IWord[] = [];

  health: number;

  // cardWord: IWord = {
  //   id: '1',
  //   group: 1,
  //   page: 1,
  //   word: 'word',
  //   image: 'img',
  //   audio: 'string',
  //   audioMeaning: 'audioMeaning',
  //   audioExample: 'string',
  //   textMeaning: 'textMeaning',
  //   textExample: 'textExample',
  //   transcription: 'transcription',
  //   textExampleTranslate: 'textExampleTranslate',
  //   textMeaningTranslate: 'textMeaningTranslate',
  //   wordTranslate: 'wordTranslate',
  //   wordsPerExampleSentence: 10,
  // };

  isStarted = false;

  // isGameInProgress = false;

  isGameOver = false;

  subscription: Subscription;

  interval1: any;

  interval2: any;

  coordinateX = 0;

  coordinateY = 50;

  stepV = 1;

  stepH = 6; // top lvl stepH = 8;

  k = -1;

  n = 0;

  constructor(private wordsApiService: WordsApiService) {}

  ngOnInit(): void {
    this.subscription = this.wordsApiService.getWordList().subscribe((response: IWord[]) => {
      this.realWordsList = response;
      console.log('RealWordsList: ', this.realWordsList);
    });
  }

  start() {
    clearInterval(this.interval1);
    clearInterval(this.interval2);
    this.learnedWords = [];
    this.unlearnedWords = [];
    this.health = 5;
    this.wordsForRoundList = this.realWordsList.slice();
    this.targetWord = this.wordsForRoundList.shift();
    this.getRandomWords(4);
    this.isStarted = true;
    // this.isGameInProgress = true;
    this.isGameOver = false;
    this.continueRun();
  }

  continueRun() {
    if (!this.wordsForRoundList.length) {
      this.isGameOver = true;
      return;
    }
    this.targetWord = this.wordsForRoundList.shift();
    this.getRandomWords(4);
    this.stepH = window.innerWidth >= 1070 ? 8 : 6;
    this.coordinateY = window.innerWidth >= 1070 ? 250 : 180;
    this.coordinateX = -150;
    this.interval1 = setInterval(() => {
      this.coordinateX += this.stepH;
      if (this.coordinateX >= window.innerWidth - 50) {
        // this.wordsForRoundList.push(this.targetWord);
        this.unlearnedWords.push(this.targetWord);
        clearInterval(this.interval1);
        clearInterval(this.interval2);
        this.checkHealth();
        this.continueRun();
      }
    }, 100);
    this.interval2 = setInterval(() => {
      if (this.n === 4) {
        this.k *= -1;
        this.n = 0;
      }
      this.n += 1;
      this.coordinateY += this.stepV * this.k;
    }, 100);
  }

  // continue() {
  //   this.isGameInProgress = true;

  //   this.continueRun();
  // }

  compareWords(event: any): void {
    clearInterval(this.interval1);
    clearInterval(this.interval2);
    if (event.target.textContent !== this.targetWord.word) {
      // this.wordsForRoundList.push(this.targetWord);
      this.unlearnedWords.push(this.targetWord);

      this.checkHealth();
      // TODO fail
    } else {
      this.learnedWords.push(this.targetWord);

      // TODO success
    }
    this.continueRun();
  }

  // arrayDuplicateChecker(array: string[], targetWord: string): void {
  //   if (!array.includes(targetWord)) {
  //     array.push(targetWord);
  //   }
  // }

  checkHealth(): void {
    if (this.health > 1) {
      this.health -= 1;
      // console.log('CheckHealth If ', this.health);
    } else {
      // console.log('checkHealth Else ', this.health);
      // console.log('END GAME: ', this.isStarted, this.isGameOver);
      this.isGameOver = true;
    }
  }

  // getRandomWord(): void {
  //   const randomNum = this.getRandomInt(this.wordList.length);
  //   for (let i = 0; i < this.wordList.length - 1; i++) {
  //     if (i === randomNum) {
  //       this.targetWord = this.wordList[i];
  //       console.log(this.targetWord, i, randomNum);
  //     }
  //   }
  // }

  getRandomWords(maxWordsNumber: number): void {
    this.answerWordsArray = [];
    this.answerWordsArray.push(this.targetWord);

    const getNonDuplicatedRandomIndex = () => {
      let randomIndex = this.getRandomInt(this.realWordsList.length);
      // let duplicatedWordIndex = this.answerWordsArray.findIndex((answer: string) => {
      //   return (answer === this.wordsList[randomIndex]);
      // });
      // if (duplicatedWordIndex > -1) {
      //   randomIndex = getNonDuplicatedRandomIndex();
      // }
      const duplicatedWord = this.answerWordsArray.find((answer: IWord) => {
        return answer === this.realWordsList[randomIndex];
      });
      if (duplicatedWord) {
        randomIndex = getNonDuplicatedRandomIndex();
      }
      return randomIndex;
    };
    for (let i = 0; i < maxWordsNumber - 1; i += 1) {
      const randomIndex = getNonDuplicatedRandomIndex();
      this.answerWordsArray.push(this.realWordsList[randomIndex]);
    }
    this.answerWordsArray = this.shuffle(this.answerWordsArray);
  }

  // TODO refactoring - change names of variables, set variables types
  shuffle(arr) {
    const newArr = arr.slice();
    let j;
    let temp;
    for (let i = newArr.length - 1; i > 0; i -= 1) {
      j = Math.floor(Math.random() * (i + 1));
      temp = newArr[j];
      newArr[j] = newArr[i];
      newArr[i] = temp;
    }
    return newArr;
  }

  getRandomInt(max): number {
    const randomNumber = Math.floor(Math.random() * Math.floor(max));
    // console.log('randomNum ', randomNumber);
    return randomNumber;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
