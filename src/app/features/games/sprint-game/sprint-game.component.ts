import { Component, HostListener, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { filter, finalize, take } from 'rxjs/operators';
import { IWord } from 'src/app/core/interfaces/iword';
import { WordsApiService } from 'src/app/core/services/wordsApi.service';
import { ToasterService } from 'src/app/core/services/toaster.service';
import { StatisticsService } from 'src/app/features/statistics/statistics.service';
import { GameID } from 'src/app/features/statistics/enums/game-id.enum';
import {
  BASE_SCORE,
  SCORE_MULTIPLIER,
  MAX_SCORE_COUNTER,
  MAX_SCORE_LVL,
  MAX_PROGRESSBAR_VALUE,
} from './constants/scoreCounters';
import { ISprintWord } from './interfaces/sprint-word';
import { GameStatuses } from './enums/game-statuses.enum';

const TIME_LIMIT = 60;
const IDGame = GameID.Sprint;

@Component({
  selector: 'app-sprint-game',
  templateUrl: './sprint-game.component.html',
  styleUrls: ['./sprint-game.component.scss'],
})
export class SprintGameComponent implements OnInit {
  score = 0;

  bonusCounter = 0;

  bonusLvl = 0;

  wordCounter = 0;

  correctWordCounter = 0;

  maxCorrectSequence = 0;

  correctSequenceCounter = 0;

  gameStatus: GameStatuses;

  words: IWord[];

  correctWords: IWord[] = [];

  difficultWords: IWord[] = [];

  gameWords: ISprintWord[] = [];

  currentWord: ISprintWord = {
    id: '',
    word: '',
    translate: '',
    randomTranslate: '',
    isCorrectTranslate: false,
    audio: '',
  };

  audio = new Audio();

  progressbarValue = MAX_PROGRESSBAR_VALUE;

  curSecond = TIME_LIMIT;

  private subscriptionWords: Subscription;

  private subscriptionTimer: Subscription;

  @HostListener('document:keydown.arrowleft') onKeydownLeftHandler() {
    if (this.gameStatus === GameStatuses.Play) {
      this.checkAnswer(false);
    }
  }

  @HostListener('document:keydown.arrowright') onKeydownRightHandler() {
    if (this.gameStatus === GameStatuses.Play) {
      this.checkAnswer(true);
    }
  }

  constructor(
    private wordsApiService: WordsApiService,
    private toastrService: ToasterService,
    private statisticsService: StatisticsService,
  ) {}

  ngOnInit(): void {
    this.gameStatus = GameStatuses.Start;
  }

  setLoadingStatus(): void {
    this.gameStatus = GameStatuses.Loading;
  }

  exit(): void {
    this.gameStatus = GameStatuses.Start;
  }

  gameInit(): void {
    this.gameStatus = GameStatuses.Play;
    this.clearValues();
    this.score = 0;
    this.wordCounter = 0;
    this.correctWords = [];
    this.difficultWords = [];
    this.timerInit();
    this.setGameWords();
  }

  gameEnd(): void {
    const dataGame = {
      idGame: IDGame,
      countAll: this.wordCounter,
      countRight: this.correctWordCounter,
      maxRight: this.maxCorrectSequence,
    };
    this.statisticsService.getDataFromGame(dataGame);
    this.subscriptionWords.unsubscribe();
    this.gameStatus = GameStatuses.End;
    this.clearValues();
  }

  checkAnswer(answer: boolean): void {
    this.wordCounter += 1;
    if (this.currentWord.isCorrectTranslate === answer) {
      this.audio.src = 'assets/audio/sprint/correct.mp3';
      this.audio.play();
      this.setScore();
      this.setCorrectCounters();
      this.correctWords.push(this.words.find((item: IWord) => item.id === this.currentWord.id));
    } else {
      this.audio.src = 'assets/audio/sprint/error.mp3';
      this.audio.play();
      this.bonusLvl = 0;
      this.bonusCounter = 0;
      this.correctSequenceCounter = 0;
      this.difficultWords.push(this.words.find((item: IWord) => item.id === this.currentWord.id));
    }
    this.setNextGameWord();
  }

  private setCorrectCounters(): void {
    this.correctWordCounter += 1;
    this.correctSequenceCounter += 1;
    if (this.correctSequenceCounter > this.maxCorrectSequence) {
      this.maxCorrectSequence = this.correctSequenceCounter;
    }
  }

  private setNextGameWord(): void {
    if (this.wordCounter === this.gameWords.length) {
      this.gameEnd();
    } else {
      const rurrentIndex = this.gameWords.indexOf(this.currentWord) + 1;
      this.currentWord = this.gameWords[rurrentIndex];
    }
  }

  private setScore(): void {
    this.score += BASE_SCORE * SCORE_MULTIPLIER ** this.bonusLvl; // рассчет бонусных очков в зависимости от lvl'a: 0-10, 1-20, 2-40, 3-80
    this.bonusCounter += 1;
    if (this.bonusCounter === MAX_SCORE_COUNTER + 1 && this.bonusLvl < MAX_SCORE_LVL - 1) {
      this.bonusCounter = 0;
      this.bonusLvl += 1;
    } else if (
      (this.bonusCounter === MAX_SCORE_COUNTER + 1 && this.bonusLvl === MAX_SCORE_LVL - 1) ||
      this.bonusLvl === MAX_SCORE_LVL
    ) {
      this.bonusCounter = 1;
      this.bonusLvl = MAX_SCORE_LVL;
    }
  }

  private setGameWords(): void {
    this.subscriptionWords = this.wordsApiService
      .getWordList()
      .pipe(filter((data) => !!data))
      .subscribe(
        (words: IWord[]) => {
          this.words = words.sort(() => Math.random() - 0.5); // рандомная сортировка слов, чтобы не было одинакового порядка слов
          this.gameWords = this.words.map((word: IWord) => {
            const randomTranslate = this.getRandomTranslate(word);
            return {
              id: word.id,
              word: word.word,
              translate: word.wordTranslate,
              randomTranslate,
              isCorrectTranslate: randomTranslate === word.wordTranslate,
              audio: word.audio,
            };
          });
          [this.currentWord] = this.gameWords;
        },
        (err) =>
          this.toastrService.showError(
            err,
            'Не удалось получить слова для изучения, попробуйте позже.',
          ),
      );
  }

  private clearValues(): void {
    this.bonusCounter = 0;
    this.bonusLvl = 0;
    this.maxCorrectSequence = 0;
    this.correctSequenceCounter = 0;
    this.gameWords = [];
    this.curSecond = TIME_LIMIT;
    this.progressbarValue = MAX_PROGRESSBAR_VALUE;
    if (this.subscriptionTimer) {
      this.subscriptionTimer.unsubscribe();
    }
  }

  private timerInit(): void {
    this.subscriptionTimer = interval(1000)
      .pipe(
        take(TIME_LIMIT),
        finalize(() => {
          if (this.curSecond === 0) {
            this.gameEnd();
          }
        }),
      )
      .subscribe((sec: number) => {
        this.progressbarValue =
          MAX_PROGRESSBAR_VALUE - ((sec + 1) * MAX_PROGRESSBAR_VALUE) / TIME_LIMIT;
        this.curSecond -= 1;
      });
  }

  private getRandomTranslate(word: IWord): string {
    const isRandom: boolean = Math.random() < 0.5;
    const randomTranslate = isRandom
      ? this.words[Math.round(Math.random() * (this.words.length - 1))].wordTranslate
      : word.wordTranslate;
    return randomTranslate;
  }
}
