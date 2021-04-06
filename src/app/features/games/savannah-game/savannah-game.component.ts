import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
// import { IWord } from 'src/app/core/interfaces/iword';
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
    'world',
    'logic',
    'wizard',
    'mail',
    'cheese',
    'rat',
    'sword',
    'generator',
    'oil',
    'ten',
  ];

  learnedWords: Set<string> = new Set();

  unlearnedWords: Set<string> = new Set();

  wordsForRoundList: string[] = [];

  targetWord: string;

  answerWordsArray: string[] = [];

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

  isGameInProgress = false;

  isGameOver = false;

  subscription: Subscription;

  interval1: any;

  interval2: any;

  coordinateX = 0;

  coordinateY = 50;

  stepV = 1;

  stepH = 4; // top lvl stepH = 8;

  k = -1;

  n = 0;

  constructor(private wordsApiService: WordsApiService) {}

  ngOnInit(): void {
    this.subscription = this.wordsApiService.getWordList().subscribe(() => {});
  }

  start() {
    // this.getRandomWord();
    this.health = 5;
    this.wordsForRoundList = this.wordsList.slice();
    this.targetWord = this.wordsForRoundList.shift();
    this.getRandomWords(4);
    this.isStarted = true;
    this.isGameInProgress = true;
    this.isGameOver = false;
    this.continueRun();
  }

  continueRun() {
    this.coordinateX = 0;
    this.coordinateY = 50;
    this.interval1 = setInterval(() => {
      this.coordinateX += this.stepH;
      if (this.coordinateX >= window.innerWidth - 50) {
        this.wordsForRoundList.push(this.targetWord);
        // this.unlearnedWords;
        clearInterval(this.interval1);
        clearInterval(this.interval2);
        this.checkHealth();
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

  continue() {
    this.isGameInProgress = true;
    this.targetWord = this.wordsForRoundList.shift();
    this.getRandomWords(4);
    this.continueRun();
  }

  compareWords(event: any): void {
    clearInterval(this.interval1);
    clearInterval(this.interval2);
    if (event.target.textContent !== this.targetWord) {
      this.wordsForRoundList.push(this.targetWord);
      this.checkHealth();
      // TODO fail
    } else {
      this.continue();
      // TODO success
    }
  }

  checkHealth(): void {
    if (this.health > 0) {
      this.health -= 1;
    } else {
      this.isGameOver = true;
    }
    this.isGameInProgress = false;
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
      let randomIndex = this.getRandomInt(this.wordsList.length);
      // let duplicatedWordIndex = this.answerWordsArray.findIndex((answer: string) => {
      //   return (answer === this.wordsList[randomIndex]);
      // });
      // if (duplicatedWordIndex > -1) {
      //   randomIndex = getNonDuplicatedRandomIndex();
      // }
      const duplicatedWord = this.answerWordsArray.find((answer: string) => {
        return answer === this.wordsList[randomIndex];
      });
      if (duplicatedWord) {
        randomIndex = getNonDuplicatedRandomIndex();
      }
      return randomIndex;
    };
    for (let i = 0; i < maxWordsNumber - 1; i += 1) {
      const randomIndex = getNonDuplicatedRandomIndex();
      this.answerWordsArray.push(this.wordsList[randomIndex]);
    }
    this.shuffle(this.answerWordsArray);
    // console.log('answerWordsArray: ', this.answerWordsArray);
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
