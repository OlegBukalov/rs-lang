import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { IWord } from 'src/app/core/interfaces/iword';
import { WordsApiService } from 'src/app/core/services/wordsApi.service';

import { StatisticsService } from 'src/app/features/statistics/statistics.service';
import { GameID } from 'src/app/features/statistics/enums/game-id.enum';

import { IComponentCanDeactivate } from './guards/exit-card-game.guard';
import { DialogElementsExampleDialogComponent } from './card-game-modal/card-game-modal.component';
import { OwnGameService } from './services/own-game.service';
import { GameState } from './services/gameState.state';

import { environment } from '../../../../environments/environment';

const ID_GAME = GameID.CardGame;

@Component({
  selector: 'app-card-game',
  templateUrl: './card-game.component.html',
  styleUrls: ['./card-game.component.scss'],
})
export class CardGameComponent implements OnInit, OnDestroy, IComponentCanDeactivate {
  LOSS_QUANTITY = 2;

  words: IWord[];
  playingWordIndexes: number[] = [];
  hardWords: IWord[] = [];
  playingWord: IWord;
  countTry: number = this.wordsApiService.INIT_MISTAKES_COUNTER;
  leftCards: number = this.wordsApiService.INIT_LEFT_CARDS_COUNTER;
  totalCategories: number = this.wordsApiService.TOTAL_CATEGORIES;
  totalPageCards: number = this.wordsApiService.TOTAL_PAGE_CARDS;
  isHiddenDataChild = false;
  isSaved: boolean = this.ownGameService.isSaved;
  isHiddenChildCard: boolean;
  isLoading: boolean;

  wordCounter = 0;
  correctWordCounter = 0;
  maxCorrectSequence = 0;
  currentMaxCorrectSequence = 0;

  state = GameState;
  currentState: GameState = GameState.STOP;

  private subscription: Subscription;

  readonly baseCardURL = environment.dataURL;

  get leftCardsCount(): number {
    return this.playingWordIndexes.length;
  }

  constructor(
    private wordsApiService: WordsApiService,
    private ownGameService: OwnGameService,
    public dialog: MatDialog,
    private statisticsService: StatisticsService,
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getGeneratedArray(length: number): number[] {
    return Array.from({ length }, (_, id) => id);
  }

  setCurrentState(state: GameState): void {
    this.currentState = state;
  }

  getData() {
    this.isLoading = true;
    this.subscription = this.wordsApiService.getWordList().subscribe((data) => {
      this.words = data;
      this.isLoading = false;
    });
  }

  initializeValuesForGame(): void {
    this.playingWordIndexes = this.words.map((_, ind) => ind).sort(() => Math.random() - 0.5);
    this.hardWords = [];
    this.playingWord = null;
    this.countTry = this.wordsApiService.INIT_MISTAKES_COUNTER;
    this.leftCards = this.wordsApiService.INIT_LEFT_CARDS_COUNTER;
    this.isHiddenDataChild = false;
    this.isHiddenChildCard = false;
    this.ownGameService.setIsSaved(true);
    this.setCurrentState(GameState.STOP);
    this.isHiddenChildCard = false;

    this.wordCounter = 0;
    this.correctWordCounter = 0;
    this.maxCorrectSequence = 0;
    this.currentMaxCorrectSequence = 0;
  }

  startGame() {
    this.setCurrentState(GameState.PLAY);
    this.playingWordIndexes = this.words.map((_, ind) => ind).sort(() => Math.random() - 0.5);
    this.isHiddenDataChild = true;
    this.ownGameService.setIsSaved(false);
    this.definePlayingWord();
  }

  definePlayingWord() {
    this.playingWord = this.leftCardsCount ? this.words[this.playingWordIndexes[0]] : null;
    this.ownGameService.setDisabledItemId(this.playingWord.id);
    this.playCard();
  }

  playCard(): void {
    this.startPlayingWordAudio();
    this.countTry = 0;
    this.setCurrentState(GameState.HOLD);
  }

  startPlayingWordAudio(): void {
    if (this.playingWord) {
      const audioInstance = new Audio();
      audioInstance.src = `${this.baseCardURL + this.playingWord.audio}`;
      audioInstance.play();
    }
  }

  checkCard(card: IWord): void {
    if (this.playingWord) {
      if (this.playingWord.audio === card.audio) {
        this.playResultAudio(true);

        this.wordCounter += 1;
        this.correctWordCounter += 1;
        this.currentMaxCorrectSequence += 1;

        this.leftCards -= 1;
        this.ownGameService.setDisabledItemId(card.id);
        this.playingWordIndexes.shift();
        this.countMistakes();
        this.checkFinishGame();
      } else {
        this.playResultAudio(false);
        this.countTry += 1;

        this.wordCounter += 1;
        this.setMaxCorrectSequence(this.currentMaxCorrectSequence);
        this.currentMaxCorrectSequence = 0;
      }
    }
  }

  checkFinishGame(): void {
    if (this.playingWordIndexes.length) {
      this.playNextWord();
    } else {
      this.finishGame();
    }
  }

  playResultAudio(isCorrect: boolean) {
    const audioInstance = new Audio();
    audioInstance.src = isCorrect
      ? '../../../../assets/sounds/yes.mp3'
      : '../../../../assets/sounds/no.mp3';
    audioInstance.play();
  }

  finishGame(): void {
    const dataGame = {
      idGame: ID_GAME,
      countAll: this.wordCounter,
      countRight: this.correctWordCounter,
      maxRight: this.maxCorrectSequence,
    };
    this.statisticsService.setDataFromGame(dataGame);

    this.setCurrentState(GameState.RESULT);
    this.isHiddenChildCard = false;
    const audioInstance = new Audio();
    audioInstance.src = '../../../../assets/sounds/466133__humanoide9000__victory-fanfare.wav';
    audioInstance.play();
  }

  countMistakes() {
    if (this.countTry > this.LOSS_QUANTITY) {
      this.hardWords.push(this.playingWord);
    }
  }

  setMaxCorrectSequence(value: number): void {
    if (this.maxCorrectSequence < value) {
      this.maxCorrectSequence = value;
    }
  }

  playNextWord() {
    setTimeout(() => {
      this.definePlayingWord();
    }, 1700);
  }

  repeatWord() {
    if (this.playingWord) {
      const audioInstance = new Audio();
      audioInstance.src = `${this.baseCardURL + this.playingWord.audio}`;
      audioInstance.play();
    }
  }

  mixCards() {
    this.getData();
    this.initializeValuesForGame();
  }

  changeLevel(level: string) {
    const randomPage: string = Math.floor(Math.random() * this.totalPageCards).toString();
    this.wordsApiService.changeGroupToken(level);
    this.wordsApiService.changePageToken(randomPage);
    this.getData();
    this.initializeValuesForGame();
  }

  canDeactivate(): boolean | Observable<boolean> {
    if (this.ownGameService.isSaved) {
      return true;
    }

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(DialogElementsExampleDialogComponent, dialogConfig);
    return dialogRef.afterClosed();
  }

  ngOnDestroy() {
    this.ownGameService.isSaved = true;
    this.subscription.unsubscribe();
  }
}
