/* eslint-disable @typescript-eslint/lines-between-class-members */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { MatDialog } from '@angular/material/dialog';

import { IWord } from 'src/app/core/interfaces/iword';
import { WordsApiService } from 'src/app/core/services/wordsApi.service';
import { IComponentCanDeactivate } from './guards/exit-card-game.guard';
import { DialogElementsExampleDialogComponent } from './card-game-modal/card-game-modal.component';
import { GameState, OwnGameService } from './services/own-game.service';

@Component({
  selector: 'app-card-game',
  templateUrl: './card-game.component.html',
  styleUrls: ['./card-game.component.scss'],
})
export class CardGameComponent implements OnInit, OnDestroy, IComponentCanDeactivate {
  COUNT_TRY = 0;
  LEFT_CARDS = 20;
  CARDS_QUANTITY = 29;
  LOSS_QUANTITY = 2;
  COUNT_CAREGORIES = 6;

  words: IWord[];
  copyWords: IWord[];
  hardWords: IWord[];
  playingWord: IWord;
  countTry: number = this.COUNT_TRY;
  leftCards: number = this.LEFT_CARDS;
  isHiddenDataChild: boolean;

  state = GameState;
  currentState: GameState = GameState.STOP;
  isSaved = true;

  private subscription: Subscription;

  readonly baseCardURL = 'https://raw.githubusercontent.com/Oubowen/rslang-data/master/';

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

  getData() {
    this.subscription = this.wordsApiService.getWordList().subscribe((data) => {
      this.words = data;
    });
  }

  initializeValues() {
    this.copyWords = [];
    this.hardWords = [];
    this.playingWord = null;
    this.countTry = this.COUNT_TRY;
    this.leftCards = this.LEFT_CARDS;
    this.currentState = GameState.STOP;
    this.isSaved = true;
    this.isHiddenDataChild = false;
  }

  startGame() {
    this.currentState = GameState.PLAY;
    this.isSaved = false;
    this.copyWords = [...this.words];
    this.startAudio();
    this.isHiddenDataChild = true;
  }

  startAudio() {
    if (this.countTry > this.LOSS_QUANTITY) {
      this.hardWords.push(this.playingWord);
    }

    if (this.currentState === GameState.PLAY) {
      this.checkFinished();
      const randomIndex = Math.floor(Math.random() * this.copyWords.length);
      const audioInstance = new Audio();
      audioInstance.src = `${this.baseCardURL + this.copyWords[randomIndex].audio}`;
      audioInstance.play();
      const cuttedWord = this.copyWords.splice(randomIndex, 1);
      [this.playingWord] = cuttedWord;
      this.currentState = GameState.HOLD;
      // service cart inactivate fot start game
      const elem = this.playingWord.id;
      this.ownGameService.setDisabledItemId(elem);
      // number of attempts per word again
      this.countTry = this.COUNT_TRY;
    }
  }

  checkFinished() {
    if (this.copyWords.length === 0) {
      this.currentState = GameState.RESULT;
      const audioInstance = new Audio();
      audioInstance.src = '../../../../assets/sounds/466133__humanoide9000__victory-fanfare.wav';
      audioInstance.play();
    }
  }

  checkCard(card: IWord) {
    if (this.playingWord) {
      if (this.playingWord.audio === card.audio) {
        const audioInstance = new Audio();
        audioInstance.src = '../../../../assets/sounds/yes.mp3';
        audioInstance.play();
        this.leftCards -= 1;
        this.playNextWord();
        // service cart inactivate
        this.ownGameService.setDisabledItemId(card.id);
      } else if (this.playingWord.audio !== card.audio) {
        const audioInstance = new Audio();
        audioInstance.src = '../../../../assets/sounds/no.mp3';
        audioInstance.play();
        this.countTry += 1;
      }
    }
  }

  playNextWord() {
    setTimeout(() => {
      this.currentState = GameState.PLAY;
      this.startAudio();
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
    this.getData();
    this.initializeValues();
  }

  canDeactivate(): boolean | Observable<boolean> {
    return this.isSaved ? true : this.openDialog();
  }

  changeLevel(level: string) {
    const randomPage: string = Math.floor(Math.random() * this.CARDS_QUANTITY).toString();
    this.wordsApiService.changeGroupToken(level);
    this.wordsApiService.changePageToken(randomPage);
    this.getData();
    this.initializeValues();
  }

  closeModal() {
    this.currentState = GameState.HOLD;
  }

  openDialog() {
    this.dialog.open(DialogElementsExampleDialogComponent);
    return false;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
