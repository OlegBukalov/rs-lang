/* eslint-disable no-return-assign */
/* eslint-disable @typescript-eslint/lines-between-class-members */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { WordsApiService } from 'src/app/core/services/wordsApi.service';
import { OwnGameService } from 'src/app/core/services/own-game/own-game.service';

import { IWord } from 'src/app/core/interfaces/iword';

@Component({
  selector: 'app-card-game-list',
  templateUrl: './card-game-list.component.html',
  styleUrls: ['./card-game-list.component.scss'],
})
export class CardGameListComponent implements OnInit, OnDestroy {
  words: IWord[];
  copyWords: IWord[];
  hardWords: IWord[] = [];
  randomIndex: number;
  isPlay = true;
  isEndGame = false;
  countTry = 0;
  isStartPlay = false;
  playingWord: IWord[];
  leftCards = 20;

  private subscription: Subscription;
  // TODO: remake with tap(pipe)
  // wordList: Observable<IWord[]>;
  // words2: IWord[];

  readonly baseCardURL = 'https://raw.githubusercontent.com/Oubowen/rslang-data/master/';

  constructor(private wordsApiService: WordsApiService, private ownGameService: OwnGameService) {}

  ngOnInit(): void {
    this.subscription = this.wordsApiService.getWordList().subscribe((data) => (this.words = data));
    // TODO: remake with tap(pipe)
    // this.wordList = this.wordsApiService.getWordList();
    // this.wordList.pipe(tap((el) => (this.words2 = el)));
  }

  startGame() {
    this.isStartPlay = true;
    this.copyWords = [...this.words];
    this.startAudio();
  }

  startAudio() {
    if (this.countTry > 2) {
      this.hardWords.push(this.playingWord[0]);
    }

    if (this.isPlay) {
      this.isFinish();
      this.randomIndex = Math.floor(Math.random() * this.copyWords.length);
      const audioInstance = new Audio();
      audioInstance.src = `${this.baseCardURL + this.copyWords[this.randomIndex].audio}`;
      audioInstance.play();
      this.playingWord = this.copyWords.splice(this.randomIndex, 1);
      this.isPlay = false;

      // service cart inactivate fot start game
      const elem = this.playingWord[0].id;
      this.ownGameService.setItemDisable(elem);
      // number of attempts per word again
      this.countTry = 0;
    }
  }

  isFinish() {
    if (this.copyWords.length === 0) {
      this.isPlay = false;
      this.isEndGame = true;
      const audioInstance = new Audio();
      audioInstance.src = '../../../../assets/sounds/466133__humanoide9000__victory-fanfare.wav';
      audioInstance.play();
      this.isEndGame = true;
    }
  }

  checkCard(card: IWord) {
    if (typeof this.playingWord !== 'undefined') {
      if (this.playingWord[0].audio === card.audio) {
        const audioInstance = new Audio();
        audioInstance.src = '../../../../assets/sounds/yes.mp3';
        audioInstance.play();
        this.leftCards -= 1;
        this.playNextWord();
        // service cart inactivate
        this.ownGameService.setItemDisable(card.id);
      } else if (this.playingWord[0].audio !== card.audio) {
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
    if (typeof this.playingWord !== 'undefined') {
      const audioInstance = new Audio();
      audioInstance.src = `${this.baseCardURL + this.playingWord[0].audio}`;
      audioInstance.play();
    }
  }

  repeatGame() {
    this.ngOnInit();
  }

  changeLevel(level: string) {
    const randomPage: string = Math.floor(Math.random() * 29).toString();
    this.wordsApiService.changeGroupToken(level);
    this.wordsApiService.changePageToken(randomPage);
    this.ngOnInit();
  }

  closeModal() {
    this.isEndGame = false;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
