/* eslint-disable @typescript-eslint/lines-between-class-members */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { IWord } from 'src/app/core/interfaces/iword';
import { WordsApiService } from 'src/app/core/services/wordsApi.service';
import { IComponentCanDeactivate } from './guards/exit-card-game.guard';
import { DialogElementsExampleDialogComponent } from './card-game-modal/card-game-modal.component';
import { OwnGameService } from './services/own-game.service';
import { GameState } from './services/gameState.state';

import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-card-game',
  templateUrl: './card-game.component.html',
  styleUrls: ['./card-game.component.scss'],
})
export class CardGameComponent implements OnInit, OnDestroy, IComponentCanDeactivate {
  COUNT_TRY = 0;
  COUNT_CAREGORIES = 6;
  LEFT_CARDS = 20;
  PAGE_CARDS = 29;
  LOSS_QUANTITY = 2;

  words: IWord[];
  playingWordIndexes: number[] = [];
  hardWords: IWord[] = [];
  playingWord: IWord;
  countTry: number = this.COUNT_TRY;
  leftCards: number = this.LEFT_CARDS;
  isHiddenDataChild = false;
  isSaved = true;

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
    this.subscription = this.wordsApiService.getWordList().subscribe((data) => {
      this.words = data;
    });
  }

  initializeValuesForGame(): void {
    this.playingWordIndexes = this.words.map((_, ind) => ind).sort(() => Math.random() - 0.5);
    this.hardWords = [];
    this.playingWord = null;
    this.countTry = this.COUNT_TRY;
    this.leftCards = this.LEFT_CARDS;
    this.isHiddenDataChild = false;
    this.isSaved = true;
  }

  startGame() {
    this.setCurrentState(GameState.PLAY);
    this.playingWordIndexes = this.words.map((_, ind) => ind).sort(() => Math.random() - 0.5);
    this.isHiddenDataChild = true;
    this.isSaved = false;
    this.definePlayingWord();
  }

  definePlayingWord() {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    this.leftCardsCount
      ? (this.playingWord = this.words[this.playingWordIndexes[0]])
      : (this.playingWord = null);
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
    if (this.playingWord.audio === card.audio) {
      this.playResultAudio(true);
      this.leftCards -= 1;
      this.ownGameService.setDisabledItemId(card.id);
      this.playingWordIndexes.shift();
      if (this.playingWordIndexes.length) {
        this.playNextWord();
      } else {
        this.finishGame();
      }
    } else {
      this.playResultAudio(false);
      this.countTry += 1;
    }
  }

  playResultAudio(value) {
    if (value) {
      const audioInstance = new Audio();
      audioInstance.src = '../../../../assets/sounds/yes.mp3';
      audioInstance.play();
      this.countMistakes();
    } else {
      const audioInstance = new Audio();
      audioInstance.src = '../../../../assets/sounds/no.mp3';
      audioInstance.play();
    }
  }

  finishGame(): void {
    this.setCurrentState(GameState.RESULT);
    const audioInstance = new Audio();
    audioInstance.src = '../../../../assets/sounds/466133__humanoide9000__victory-fanfare.wav';
    audioInstance.play();
  }

  countMistakes() {
    if (this.countTry > this.LOSS_QUANTITY) {
      this.hardWords.push(this.playingWord);
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

  repeatGame() {
    this.initializeValuesForGame();
  }

  mixCards() {
    this.getData();
    this.initializeValuesForGame();
  }

  changeLevel(level: string) {
    const randomPage: string = Math.floor(Math.random() * this.PAGE_CARDS).toString();
    this.wordsApiService.changeGroupToken(level);
    this.wordsApiService.changePageToken(randomPage);
    this.getData();
    this.initializeValuesForGame();
  }

  canDeactivate(): boolean | Observable<boolean> {
    return this.isSaved ? true : this.openDialog();
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    this.dialog.open(DialogElementsExampleDialogComponent, dialogConfig);
    return false;
  }

  closeModal() {
    this.setCurrentState(GameState.HOLD);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
