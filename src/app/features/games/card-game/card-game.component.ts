/* eslint-disable @typescript-eslint/lines-between-class-members */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { MatDialog } from '@angular/material/dialog';

import { IWord } from 'src/app/core/interfaces/iword';
import { WordsApiService } from 'src/app/core/services/wordsApi.service';
import { IComponentCanDeactivate } from './guards/exit-card-game.guard';
import { DialogElementsExampleDialogComponent } from './card-game-modal/card-game-modal.component';
import { OwnGameService } from './services/own-game.service';

@Component({
  selector: 'app-card-game',
  templateUrl: './card-game.component.html',
  styleUrls: ['./card-game.component.scss'],
})
export class CardGameComponent implements OnInit, OnDestroy, IComponentCanDeactivate {
  COUNT_TRY = 0;
  LEFT_CARDS = 20;
  CARDS_QUANTITY = 29;

  words: IWord[];
  copyWords: IWord[];
  hardWords: IWord[];
  playingWord: IWord;
  countTry: number;
  leftCards: number;
  isPlay: boolean;
  isShowResult: boolean;
  isStartPlay: boolean;
  isSaved: boolean;

  private subscription: Subscription;

  readonly baseCardURL = 'https://raw.githubusercontent.com/Oubowen/rslang-data/master/';

  constructor(
    private wordsApiService: WordsApiService,
    private ownGameService: OwnGameService,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.getData();
    this.initializeValues();
  }

  getData() {
    this.subscription = this.wordsApiService.getWordList().subscribe((data) => {
      this.words = data;
    });
  }

  initializeValues() {
    this.copyWords = [];
    this.playingWord = null;
    this.hardWords = [];
    this.countTry = this.COUNT_TRY;
    this.leftCards = this.LEFT_CARDS;
    this.isPlay = true;
    this.isShowResult = false;
    this.isStartPlay = false;
    this.isSaved = true;
  }

  startGame() {
    this.isStartPlay = true;
    this.isSaved = false;
    this.copyWords = [...this.words];
    this.startAudio();
  }

  startAudio() {
    if (this.countTry > 2) {
      this.hardWords.push(this.playingWord);
    }

    if (this.isPlay) {
      this.checkFinished();
      const randomIndex = Math.floor(Math.random() * this.copyWords.length);
      const audioInstance = new Audio();
      audioInstance.src = `${this.baseCardURL + this.copyWords[randomIndex].audio}`;
      audioInstance.play();
      const cuttedWord = this.copyWords.splice(randomIndex, 1);
      [this.playingWord] = cuttedWord;
      this.isPlay = false;

      // service cart inactivate fot start game
      const elem = this.playingWord.id;
      this.ownGameService.setDisabledItemId(elem);
      // number of attempts per word again
      this.countTry = 0;
    }
  }

  checkFinished() {
    if (this.copyWords.length === 0) {
      this.isPlay = false;
      this.isShowResult = true;
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
      this.isPlay = true;
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
    // return this.isSaved ? true : confirm('Вы хотите выйти из игры?');
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
    this.isShowResult = false;
  }

  openDialog() {
    this.dialog.open(DialogElementsExampleDialogComponent);
    return false;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
