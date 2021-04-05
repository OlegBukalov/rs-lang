/* eslint-disable @typescript-eslint/lines-between-class-members */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { MatDialog } from '@angular/material/dialog';

import { IWord } from 'src/app/core/interfaces/iword';
import { WordsApiService } from 'src/app/core/services/wordsApi.service';
import { IComponentCanDeactivate } from './guards/exit-card-game.guard';
import { DialogElementsExampleDialogComponent } from './card-game-modal/card-game-modal.component';
import { OwnGameService } from './services/own-game.service';
import { GameState } from './services/gameState.state';

@Component({
  selector: 'app-card-game',
  templateUrl: './card-game.component.html',
  styleUrls: ['./card-game.component.scss'],
})
export class CardGameComponent implements OnInit, OnDestroy, IComponentCanDeactivate {
  COUNT_TRY = 0;
  COUNT_CAREGORIES = 6;
  COUNT_WORDS_ID = 0;
  LEFT_CARDS = 20;
  PAGE_CARDS = 29;
  LOSS_QUANTITY = 2;

  wordsID: string[];
  words: IWord[];
  hardWords: IWord[] = [];
  playingWord: IWord;
  countTry: number = this.COUNT_TRY;
  leftCards: number = this.LEFT_CARDS;
  wordIndex: number = this.COUNT_WORDS_ID;
  isHiddenDataChild = false;
  isSaved = true;

  state = GameState;
  currentState: GameState = GameState.STOP;

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

  getCurrentState(): GameState {
    return this.currentState;
  }

  setCurrentState(state: GameState): void {
    this.currentState = state;
  }

  getData() {
    this.subscription = this.wordsApiService.getWordList().subscribe((data) => {
      this.words = data;
    });
  }

  initializeValues() {
    this.currentState = GameState.STOP;
    this.wordsID = [];
    this.hardWords = [];
    this.playingWord = null;
    this.wordIndex = this.COUNT_WORDS_ID;
    this.countTry = this.COUNT_TRY;
    this.leftCards = this.LEFT_CARDS;
    this.isHiddenDataChild = false;
    this.isSaved = true;
  }

  startGame() {
    this.setCurrentState(GameState.PLAY);
    this.wordsID = this.words.map((el) => el.id).sort(() => Math.random() - 0.5);
    this.isHiddenDataChild = true;
    this.isSaved = false;
    this.initializeGameSteps();
  }

  initializeGameSteps() {
    this.checkFinished();
    for (let i = this.wordIndex; i < this.wordsID.length; i += 1) {
      if (this.getCurrentState() === GameState.PLAY) {
        this.playingWord = this.words.find((el) => el.id === this.wordsID[i]);
        this.startAudio();
        this.wordIndex += 1;
        this.setCurrentState(GameState.HOLD);
        // service cart inactivate fot start game
        const elem = this.playingWord.id;
        this.ownGameService.setDisabledItemId(elem);
        // number of attempts per word again
        this.countTry = this.COUNT_TRY;
      }
    }
  }

  startAudio() {
    const audioInstance = new Audio();
    audioInstance.src = `${this.baseCardURL + this.playingWord.audio}`;
    audioInstance.play();
  }

  checkFinished() {
    if (this.wordIndex === this.wordsID.length) {
      this.setCurrentState(GameState.RESULT);
      const audioInstance = new Audio();
      audioInstance.src = '../../../../assets/sounds/466133__humanoide9000__victory-fanfare.wav';
      audioInstance.play();
    }
  }

  checkCard(card: IWord) {
    if (this.playingWord) {
      if (this.playingWord.audio !== card.audio) {
        const audioInstance = new Audio();
        audioInstance.src = '../../../../assets/sounds/no.mp3';
        audioInstance.play();
        this.countTry += 1;
      } else {
        this.countMistakes();
        const audioInstance = new Audio();
        audioInstance.src = '../../../../assets/sounds/yes.mp3';
        audioInstance.play();
        this.leftCards -= 1;
        this.playNextWord();
        // service cart inactivate
        this.ownGameService.setDisabledItemId(card.id);
      }
    }
  }

  countMistakes() {
    if (this.countTry > this.LOSS_QUANTITY) {
      this.hardWords.push(this.playingWord);
    }
  }

  playNextWord() {
    setTimeout(() => {
      this.setCurrentState(GameState.PLAY);
      this.initializeGameSteps();
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
    const randomPage: string = Math.floor(Math.random() * this.PAGE_CARDS).toString();
    this.wordsApiService.changeGroupToken(level);
    this.wordsApiService.changePageToken(randomPage);
    this.getData();
    this.initializeValues();
  }

  closeModal() {
    this.setCurrentState(GameState.HOLD);
    this.getCurrentState();
  }

  openDialog() {
    this.dialog.open(DialogElementsExampleDialogComponent);
    return false;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
