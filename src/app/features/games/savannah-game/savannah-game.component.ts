import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { IWord } from 'src/app/core/interfaces/iword';
import { DictionaryService } from 'src/app/core/services/dictionary.service';
import { ToasterService } from 'src/app/core/services/toaster.service';
import { WordsApiService } from 'src/app/core/services/wordsApi.service';
import { AuthService } from '../../auth/auth.service';
import { DictionaryCategory } from '../../dictionary/dictionary-category';
import { StatisticsService } from '../../statistics/statistics.service';
import {
  DEFAULT_LEVEL,
  GameState,
  GAME_ID,
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

  maxCorrectSequence = 0;

  currentCorrectSequence = 0;

  prevUnlearnedWordsLength: number;

  prevLearnedWordsLength: number;

  intervalX: any;

  intervalY: any;

  subscription: Subscription;

  isTextbookGameOpen = false;

  constructor(
    private wordsApiService: WordsApiService,
    private toastrService: ToasterService,
    private coordinateService: CoordinateService,
    private utilitiesService: UtilitiesService,
    private statisticsService: StatisticsService,
    private dictionaryService: DictionaryService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    const debouncedHandleResize = this.utilitiesService.debounce(() => {
      this.coordinateY = this.coordinateService.getAnimalCoordinateY();
    }, 1000);
    window.addEventListener('resize', debouncedHandleResize);
    this.isTextbookGameOpen = this.wordsApiService.getTextbookGameOpenFlag();
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
    this.wordsApiService.changeGroupToken(this.selectedLevel.toString());
    this.wordsApiService.setRandomPage();
  }

  start(): void {
    if (!this.isTextbookGameOpen) {
      this.wordsApiService.setRandomPage();
    }
    this.wordsListForLevel = [];
    this.untouchableFullWordsList = [];
    this.setGameWords(this.wordsApiService.WORDS_PER_PAGE);
  }

  private setGameWords(arrLength: number): void {
    let wordsLeft = arrLength;
    let maxCounter = arrLength;
    const currentPage = this.wordsApiService.getPageToken();
    this.subscription = this.wordsApiService
      .getRandomWordList()
      .pipe(filter((data) => !!data))
      .subscribe(
        (words: IWord[]) => {
          if (wordsLeft >= words.length) {
            maxCounter = words.length;
            wordsLeft -= maxCounter;
          } else {
            wordsLeft = 0;
          }
          this.untouchableFullWordsList = this.untouchableFullWordsList.concat(
            words.slice(0, maxCounter),
          );
          if (wordsLeft > 0 && currentPage > 0) {
            this.wordsApiService.changePageToken((currentPage - 1).toString());
            this.setGameWords(wordsLeft);
          } else {
            this.wordsListForLevel = this.untouchableFullWordsList.slice();
            this.resetGameParameters();
            this.continueRun();
          }
        },
        (err) =>
          this.toastrService.showError(
            err,
            'Не удалось получить слова для изучения, попробуйте позже.',
          ),
      );
  }

  resetGameParameters(): void {
    this.clearIntervals();
    this.health = MAX_HEALTH;
    this.learnedWords = [];
    this.unlearnedWords = [];
    this.prevLearnedWordsLength = 0;
    this.prevUnlearnedWordsLength = 0;
    this.currentCorrectSequence = 0;
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

  calculateMaxCorrectSequence() {
    if (
      this.prevUnlearnedWordsLength === this.unlearnedWords.length &&
      this.prevLearnedWordsLength < this.learnedWords.length
    ) {
      this.currentCorrectSequence += 1;
    } else {
      this.currentCorrectSequence = 0;
    }
    if (this.currentCorrectSequence > this.maxCorrectSequence) {
      this.maxCorrectSequence = this.currentCorrectSequence;
    }
    this.prevLearnedWordsLength = this.learnedWords.length;
    this.prevUnlearnedWordsLength = this.unlearnedWords.length;
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
    this.calculateMaxCorrectSequence();
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
    this.calculateMaxCorrectSequence();
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

  calculateGameScore(): void {
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
    this.calculateGameScore();
    if (this.authService.isLoggedIn()) {
      this.sendGameStatistics();
    }
    this.state = GameState.Over;
  }

  sendGameStatistics(): void {
    const gameData = {
      idGame: GAME_ID,
      countAll: this.learnedWords.length + this.unlearnedWords.length,
      countRight: this.learnedWords.length,
      maxRight: this.maxCorrectSequence,
    };
    this.statisticsService.setDataFromGame(gameData);
    this.addWordsToDictionary(this.learnedWords, DictionaryCategory.Studied);
    this.addWordsToDictionary(this.unlearnedWords, DictionaryCategory.Hard);
  }

  private addWordsToDictionary(words: IWord[], category: DictionaryCategory): void {
    const wordIdArr = words.map((word: IWord) => word.id);
    this.dictionaryService.addWordsToDictionary(wordIdArr, category);
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
