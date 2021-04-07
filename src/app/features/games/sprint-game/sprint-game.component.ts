import { Component, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { filter, finalize, take } from 'rxjs/operators';
import { IWord } from 'src/app/core/interfaces/iword';
import { WordsApiService } from 'src/app/core/services/wordsApi.service';
import { ToasterService } from 'src/app/core/services/toaster.service';
import { ISprintWord } from './interfaces/sprint-word';
import { GameStatuses } from './enums/game-statuses.enum';

const TIME_LIMIT = 60;

@Component({
  selector: 'app-sprint-game',
  templateUrl: './sprint-game.component.html',
  styleUrls: ['./sprint-game.component.scss'],
})
export class SprintGameComponent implements OnInit {
  score = 0;

  bonusScoreCounter = 0;

  bonusScoreLvl = 0;

  wordCounter = 0;

  gameStatus: GameStatuses;

  words: IWord[];

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

  progressbarValue = 100;

  curSecond = TIME_LIMIT;

  private subscriptionWords: Subscription;

  private subscriptionTimer: Subscription;

  constructor(private wordsApiService: WordsApiService, private toastrService: ToasterService) {}

  ngOnInit(): void {
    this.gameStatus = GameStatuses.Start;
  }

  setLoadingStatus(): void {
    this.gameStatus = GameStatuses.Loading;
  }

  gameInit(): void {
    this.gameStatus = GameStatuses.Play;
    this.clearValues();
    this.score = 0;
    this.timerInit();
    this.setGameWords();
  }

  gameEnd(): void {
    this.subscriptionWords.unsubscribe();
    this.gameStatus = GameStatuses.End;
    this.clearValues();
  }

  checkAnswer(answer: boolean): void {
    this.wordCounter += 1;
    if (this.currentWord.isCorrectTranslate === answer) {
      this.audio.src = 'assets/audio/sprint/correct.mp3';
      this.audio.play();
      this.score += 10 * 2 ** this.bonusScoreLvl; // рассчет бонусных очков в зависимости от lvl'a: 0-10, 1-20, 2-40, 3-80

      this.bonusScoreCounter += 1;
      if (this.bonusScoreCounter === 4 && this.bonusScoreLvl < 2) {
        this.bonusScoreCounter = 0;
        this.bonusScoreLvl += 1;
      } else if (
        (this.bonusScoreCounter === 4 && this.bonusScoreLvl === 2) ||
        this.bonusScoreLvl === 3
      ) {
        this.bonusScoreCounter = 1;
        this.bonusScoreLvl = 3;
      }
    } else {
      this.audio.src = 'assets/audio/sprint/error.mp3';
      this.audio.play();
      this.bonusScoreLvl = 0;
      this.bonusScoreCounter = 0;
    }
    if (this.wordCounter === this.gameWords.length) {
      this.gameEnd();
    } else {
      const rurrentIndex = this.gameWords.indexOf(this.currentWord) + 1;
      this.currentWord = this.gameWords[rurrentIndex];
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
    this.bonusScoreCounter = 0;
    this.bonusScoreLvl = 0;
    this.wordCounter = 0;
    this.gameWords = [];
    this.curSecond = TIME_LIMIT;
    this.progressbarValue = 100;
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
        this.progressbarValue = 100 - ((sec + 1) * 100) / TIME_LIMIT;
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
