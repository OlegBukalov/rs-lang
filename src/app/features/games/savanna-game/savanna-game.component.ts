import { animate, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { IWord } from 'src/app/core/interfaces/iword';
import { WordsApiService } from 'src/app/core/services/wordsApi.service';

@Component({
  selector: 'app-savanna-game',
  templateUrl: './savanna-game.component.html',
  styleUrls: ['./savanna-game.component.scss'],
  // animations: [
  //   trigger('fade', [
  //     transition('void => *', [
  //       style({ backgroundColor: 'yellow', opacity: 0 }),
  //       animate(2000),
  //     ])
  //   ])
  // ]
})
export class SavannaGameComponent implements OnInit, OnDestroy {
  level = 1;
  wordsList: string[] = ['agree', 'alcohol', 'boat', 'car', 'bridge', 'master', 'application', 'ball', 'cow', 'arrow'];
  wordsForRoundList: string[] = [];
  targetWord: string;
  answerWordsArray: string[] = [];
  health: number = 3;
  cardWord: IWord = {  
    id: "1",
    group: 1,
    page: 1,
    word: 'word',
    image: 'img',
    audio: 'string',
    audioMeaning: 'audioMeaning',
    audioExample: 'string',
    textMeaning: 'textMeaning',
    textExample: 'textExample',
    transcription: 'transcription',
    textExampleTranslate: 'textExampleTranslate',
    textMeaningTranslate: 'textMeaningTranslate',
    wordTranslate: 'wordTranslate',
    wordsPerExampleSentence: 10,
  };
  isStarted = false;
  isGameInProgress = false;
  subscription: Subscription;
  interval1: any;
  interval2: any;
  coordinateX = 0;
  coordinateY = 50;
  stepV = 1;
  stepH = 4; // top lvl stepH = 8;
  k = -1;
  n = 0;

  constructor(private wordsApiService: WordsApiService, private elementRef: ElementRef) {}

  ngOnInit(): void {
    // this.subscription = this.wordsApiService.getWordList().subscribe((wordList: IWord[]) => {
    //   this.wordList = wordList;
    //   console.log('wordList ', this.wordList);
    // });
  }

  start() {
    // this.getRandomWord();
    this.wordsForRoundList = this.wordsList.slice();
    this.targetWord = this.wordsForRoundList.shift();
    this.getRandomWords(4);
    this.isStarted = !this.isStarted;
    this.isGameInProgress = true;
    this.continueRun();
  }

  continueRun() {
    this.coordinateX = 0;
    this.coordinateY = 50;
    this.interval1 = setInterval(() => {
      console.log('started -> x');
      this.coordinateX += this.stepH;
      if (this.coordinateX >= window.innerWidth - 50) {
        this.wordsForRoundList.push(this.targetWord);
        clearInterval(this.interval1);
        clearInterval(this.interval2);
        this.isGameInProgress = false;
        --this.health;
      }
    }, 100)
    this.interval2 = setInterval(() => {
      console.log('started -> y');
      if (this.n === 4) {
        this.k *= -1;
        this.n = 0;
      }
      this.n++;
      this.coordinateY += this.stepV * this.k;
    }, 100)
  }

  continue() {
    this.isGameInProgress = true;
    this.targetWord = this.wordsForRoundList.shift();
    this.getRandomWords(4);
    this.continueRun();
    console.log(this.wordsForRoundList);
  }

  compareWords(event: any): void {
    clearInterval(this.interval1);
    clearInterval(this.interval2);
    if (event.target.textContent !== this.targetWord) {
      this.wordsForRoundList.push(this.targetWord);
      --this.health;
      console.error('false');
      this.isGameInProgress = false;
      // TODO fail
    } else {
      console.log('true');
      this.continue();
      // TODO success
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
      let randomIndex = this.getRandomInt(this.wordsList.length);
      // let duplicatedWordIndex = this.answerWordsArray.findIndex((answer: string) => {
      //   return (answer === this.wordsList[randomIndex]);
      // });
      // if (duplicatedWordIndex > -1) {
      //   randomIndex = getNonDuplicatedRandomIndex();
      // }
      let duplicatedWord = this.answerWordsArray.find((answer: string) => {
        return (answer === this.wordsList[randomIndex]);
      });
      if (duplicatedWord) {
        randomIndex = getNonDuplicatedRandomIndex();
      }
      return randomIndex;
    }
    for (let i = 0; i < maxWordsNumber - 1; i++) {
      let randomIndex = getNonDuplicatedRandomIndex();
      this.answerWordsArray.push(this.wordsList[randomIndex]);
    }
    this.shuffle(this.answerWordsArray);
    // console.log('answerWordsArray: ', this.answerWordsArray);
  }

  // TODO refactoring - change names of variables, set variables types
  shuffle(arr){
    let j, temp;
    for(let i = arr.length - 1; i > 0; i--){
      j = Math.floor(Math.random()*(i + 1));
      temp = arr[j];
      arr[j] = arr[i];
      arr[i] = temp;
    }
    return arr;
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
