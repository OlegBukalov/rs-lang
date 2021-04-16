import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IWord } from 'src/app/core/interfaces/iword';
import { ToasterService } from 'src/app/core/services/toaster.service';
import { WordsApiService } from 'src/app/core/services/wordsApi.service';
import {
  DEFAULT_LEVEL,
  GameState,
  HEALTH_ICON_WIDTH,
  LEVELS,
  MAX_HEALTH,
  MAX_WORDS_NUMBER,
  ONE_SCORE_POINT,
  START_COORDINATE_X,
  START_COORDINATE_Y,
  STEP_X,
  WordProperty,
} from './constants';
import { CoordinateService } from './services/coordinate.service';
import { UtilitiesService } from './services/utilities.service';

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

  healthIconWidth = HEALTH_ICON_WIDTH;

  state: GameState = GameState.Pending;

  gameState = GameState;

  languageSet = WordProperty;

  wordProperty: WordProperty = WordProperty.English;

  score: number;

  coordinateX = START_COORDINATE_X;

  coordinateY = START_COORDINATE_Y;

  levels = LEVELS;

  selectedLevel = DEFAULT_LEVEL;

  intervalX: any;

  intervalY: any;

  subscription: Subscription;

  constructor(
    private wordsApiService: WordsApiService,
    private toastrService: ToasterService,
    private coordinateService: CoordinateService,
    private utilitiesService: UtilitiesService,
  ) {}

  ngOnInit(): void {
    this.selectLevel(DEFAULT_LEVEL);
    const debouncedHandleResize = this.utilitiesService.debounce(() => {
      this.coordinateY = this.coordinateService.getAnimalCoordinateY();
    }, 1000);
    window.addEventListener('resize', debouncedHandleResize);
  }

  switchLanguages(): void {
    this.wordProperty = this.getOppositeLanguage(this.wordProperty);
  }

  getOppositeLanguage(language: WordProperty): WordProperty {
    if (language === WordProperty.Russian) {
      return WordProperty.English;
    }
    return WordProperty.Russian;
  }

  selectLevel(level: number): void {
    this.selectedLevel = level;
    this.wordsApiService.changeGroupToken(level.toString());
    this.wordsApiService.setRandomPage();
  }

  start(): void {
    this.subscription = this.wordsApiService.getWordList().subscribe(
      (response: IWord[]) => {
        this.untouchableFullWordsList = response;
        this.wordsListForLevel = this.untouchableFullWordsList.slice();
        this.resetGameParameters();
        this.continueRun();
      },
      (error: Error) => {
        this.toastrService.showError(error.message, 'Ошибка');
      },
    );
  }

  resetGameParameters(): void {
    this.clearIntervals();
    this.health = MAX_HEALTH;
    this.learnedWords = [];
    this.unlearnedWords = [];
    this.state = GameState.InProgress;
  }

  continueRun(): void {
    if (!this.wordsListForLevel.length) {
      this.finishGame();
      return;
    }
    this.targetWord = this.wordsListForLevel.shift();
    this.mixFourRandomWords();
    this.setAnimalParameters();
    this.intervalX = setInterval(() => {
      this.coordinateX += STEP_X;
      if (this.coordinateX >= this.coordinateService.getWindowWidth()) {
        this.handleWrongAnswer();
      }
    }, 100);
    this.intervalY = setInterval(() => {
      this.coordinateY += this.coordinateService.calculateStepY();
    }, 100);
  }

  setAnimalParameters(): void {
    this.coordinateY = this.coordinateService.getAnimalCoordinateY();
    this.coordinateX = START_COORDINATE_X;
  }

  checkAnswer(answer: IWord): void {
    if (this.isAnswerCorrect(answer)) {
      this.handleCorrectAnswer();
    } else {
      this.handleWrongAnswer();
    }
  }

  private isAnswerCorrect(answer: IWord): boolean {
    return this.utilitiesService.compareObjectsByProperty(
      this.wordProperty,
      answer,
      this.targetWord,
    );
  }

  handleCorrectAnswer(): void {
    this.clearIntervals();
    this.learnedWords.push(this.targetWord);
    this.toastrService.showSuccess(
      'Верно!',
      `${this.targetWord.word} - ${this.targetWord.wordTranslate}`,
      {
        positionClass: 'toast-top-left',
      },
    );
    this.continueRun();
  }

  handleWrongAnswer(): void {
    this.unlearnedWords.push(this.targetWord);
    this.toastrService.showError(
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

  calculateScore(): void {
    this.score = +this.learnedWords?.length * ONE_SCORE_POINT;
  }

  checkHealth(): boolean {
    this.health -= 1;
    if (this.health <= 0) {
      this.finishGame();
      return false;
    }
    this.clearIntervals();
    return true;
  }

  private finishGame(): void {
    this.clearIntervals();
    this.calculateScore();
    this.state = GameState.Over;
  }

  private clearIntervals(): void {
    clearInterval(this.intervalX);
    clearInterval(this.intervalY);
  }

  mixFourRandomWords(): void {
    this.answerWordsArray = [];
    this.answerWordsArray.push(this.targetWord);
    const getNonDuplicatedRandomIndex = () => {
      let randomIndex = this.utilitiesService.getRandomInt(this.untouchableFullWordsList.length);
      const duplicatedWord = this.answerWordsArray.find((answer: IWord) => {
        return answer === this.untouchableFullWordsList[randomIndex];
      });
      if (duplicatedWord) {
        randomIndex = getNonDuplicatedRandomIndex();
      }
      return randomIndex;
    };
    for (let i = 0; i < MAX_WORDS_NUMBER - 1; i += 1) {
      const randomIndex = getNonDuplicatedRandomIndex();
      this.answerWordsArray.push(this.untouchableFullWordsList[randomIndex]);
    }
    this.answerWordsArray = this.utilitiesService.shuffleWords<IWord>(this.answerWordsArray);
  }

  ngOnDestroy(): void {
    this.clearIntervals();
    this.subscription?.unsubscribe();
  }
}
