import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IWord } from 'src/app/core/interfaces/iword';
import { ToasterService } from 'src/app/core/services/toaster.service';
import { WordsApiService } from 'src/app/core/services/wordsApi.service';

@Component({
  selector: 'app-savannah-game',
  templateUrl: './savannah-game.component.html',
  styleUrls: ['./savannah-game.component.scss'],
})
export class SavannahGameComponent implements OnInit, OnDestroy {
  untouchableFullWordsList: IWord[] = [];

  wordsListForLevel: IWord[] = [];

  targetWord: IWord;

  answerWordsArray: IWord[] = [];

  learnedWords: IWord[];

  unlearnedWords: IWord[];

  health: number;

  isStarted = false;

  isGameOver = false;

  isRussianEnglish = false;

  coordinateX = 0;

  coordinateY = 50;

  stepY = 1;

  stepX = 6; // speed

  inverter = -1;

  fourVerticalStepsCounter = 0;

  levels = [0, 1, 2, 3, 4, 5];

  selectedLevel = 0;

  intervalX: any;

  intervalY: any;

  subscription: Subscription;

  constructor(private wordsApiService: WordsApiService, private toastrService: ToasterService) {}

  ngOnInit(): void {
    this.selectLevel(0);
  }

  // TODO maybe change logic
  selectLevel(level: number): void {
    this.selectedLevel = level;
    this.wordsApiService.changeGroupToken(level.toString());
    this.wordsApiService.setRandomPage();
  }

  start(): void {
    new Promise((resolve, reject) => {
      this.subscription = this.wordsApiService.getWordList().subscribe(
        (response: IWord[]) => {
          this.untouchableFullWordsList = response;
          resolve(true);
        },
        (error) => {
          reject(error);
        },
      );
    })
      .then(() => {
        this.wordsListForLevel = this.untouchableFullWordsList.slice();
        this.resetGameParametrs();
        this.continueRun();
      })
      .catch((error) => {
        this.toastrService.showError(error, 'Ошибка');
      });
  }

  resetGameParametrs(): void {
    this.health = 5;
    this.learnedWords = [];
    this.unlearnedWords = [];
    this.isGameOver = false;
    this.isStarted = true;
  }

  continueRun(): void {
    if (!this.wordsListForLevel.length) {
      // TODO Game Over Logic...
      this.isGameOver = true;
      this.isStarted = false;
      this.clearIntervals();
      return;
    }
    this.targetWord = this.wordsListForLevel.shift();
    this.getFourRandomWords();
    this.setAnimalParametrs();
    this.intervalX = setInterval(() => {
      this.coordinateX += this.stepX;
      if (this.coordinateX >= window.innerWidth - 50) {
        this.unlearnedWords.push(this.targetWord);
        this.toastrService.showCustomAlert(
          'Неверно!',
          `${this.targetWord.word} - ${this.targetWord.wordTranslate}`,
          {
            positionClass: 'toast-top-right',
          },
        );
        this.checkHealth();
        this.continueRun();
      }
    }, 100);
    this.intervalY = setInterval(() => {
      if (this.fourVerticalStepsCounter === 4) {
        this.inverter *= -1;
        this.fourVerticalStepsCounter = 0;
      }
      this.fourVerticalStepsCounter += 1;
      this.coordinateY += this.stepY * this.inverter;
    }, 100);
  }

  setAnimalParametrs(): void {
    this.stepX = window.innerWidth >= 1070 ? 8 : 6; // start speed
    this.coordinateY = window.innerWidth >= 1070 ? 310 : 240; // start y coordinate
    this.coordinateX = -150; // start x coordinate
  }

  compareWords(answer: IWord): void {
    if (
      answer.word === this.targetWord.word ||
      answer.wordTranslate === this.targetWord.wordTranslate
    ) {
      // TODO success
      this.clearIntervals();
      this.learnedWords.push(this.targetWord);
      this.toastrService.showShow(
        'Верно!',
        `${this.targetWord.word} - ${this.targetWord.wordTranslate}`,
        {
          positionClass: 'toast-top-left',
        },
      );
      this.continueRun();
    } else {
      // TODO FAIL
      this.unlearnedWords.push(this.targetWord);
      this.toastrService.showCustomAlert(
        'Неверно!',
        `${this.targetWord.word} - ${this.targetWord.wordTranslate}`,
        {
          positionClass: 'toast-top-right',
        },
      );
      if (this.checkHealth()) {
        this.continueRun();
      }
    }
  }

  checkHealth(): boolean {
    this.clearIntervals();
    this.health -= 1;
    if (this.health === 0) {
      this.isStarted = false;
      this.isGameOver = true;
      return false;
    }
    return true;
  }

  clearIntervals(): void {
    clearInterval(this.intervalX);
    clearInterval(this.intervalY);
  }

  getFourRandomWords(): void {
    const maxWordsNumber = 4;
    this.answerWordsArray = [];
    this.answerWordsArray.push(this.targetWord);
    const getNonDuplicatedRandomIndex = () => {
      let randomIndex = this.getRandomInt(this.untouchableFullWordsList.length);
      const duplicatedWord = this.answerWordsArray.find((answer: IWord) => {
        return answer === this.untouchableFullWordsList[randomIndex];
      });
      if (duplicatedWord) {
        randomIndex = getNonDuplicatedRandomIndex();
      }
      return randomIndex;
    };
    for (let i = 0; i < maxWordsNumber - 1; i += 1) {
      const randomIndex = getNonDuplicatedRandomIndex();
      this.answerWordsArray.push(this.untouchableFullWordsList[randomIndex]);
    }
    this.answerWordsArray = this.wordsShuffler(this.answerWordsArray);
  }

  wordsShuffler(array): IWord[] {
    const arrayForShuffle = array.slice();
    let randomIndex;
    let tempElement;
    for (let i = arrayForShuffle.length - 1; i > 0; i -= 1) {
      randomIndex = Math.floor(Math.random() * (i + 1));
      tempElement = arrayForShuffle[randomIndex];
      arrayForShuffle[randomIndex] = arrayForShuffle[i];
      arrayForShuffle[i] = tempElement;
    }
    return arrayForShuffle;
  }

  getRandomInt(max): number {
    const randomNumber = Math.floor(Math.random() * Math.floor(max));
    return randomNumber;
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
