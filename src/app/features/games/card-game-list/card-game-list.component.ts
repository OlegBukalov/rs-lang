/* eslint-disable no-return-assign */
/* eslint-disable @typescript-eslint/lines-between-class-members */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IWord } from 'src/app/core/interfaces/iword';
import { WordsApiService } from 'src/app/core/services/wordsApi.service';

@Component({
  selector: 'app-card-game-list',
  templateUrl: './card-game-list.component.html',
  styleUrls: ['./card-game-list.component.scss'],
})
export class CardGameListComponent implements OnInit, OnDestroy {
  words: IWord[];
  copyWords: IWord[];
  index: number;
  isPlay = true;
  isStartPlay = false;
  isPlayingWord: IWord[];

  private subscription: Subscription;
  // TODO: remake with tap(pipe)
  // wordList: Observable<IWord[]>;
  // words2: IWord[];

  readonly baseCardURL = 'https://raw.githubusercontent.com/Oubowen/rslang-data/master/';

  constructor(private wordsApiService: WordsApiService) {}

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
    if (this.isPlay) {
      this.isFinish();
      this.index = Math.floor(Math.random() * this.copyWords.length);
      const audioInstance = new Audio();
      audioInstance.src = `${this.baseCardURL + this.copyWords[this.index].audio}`;
      audioInstance.play();
      this.isPlayingWord = this.copyWords.splice(this.index, 1);
      this.isPlay = false;
    }
  }

  isFinish() {
    if (this.copyWords.length === 0) {
      this.isPlay = false;
      const audioInstance = new Audio();
      audioInstance.src = '../../../../assets/sounds/466133__humanoide9000__victory-fanfare.wav';
      audioInstance.play();
    }
  }

  checkCard(card: IWord) {
    if (this.isPlayingWord[0].audio === card.audio) {
      const audioInstance = new Audio();
      audioInstance.src = '../../../../assets/sounds/yes.mp3';
      audioInstance.play();
      this.playNextWord();
    } else if (this.isPlayingWord[0].audio !== card.audio) {
      const audioInstance = new Audio();
      audioInstance.src = '../../../../assets/sounds/no.mp3';
      audioInstance.play();
    }
  }

  playNextWord() {
    setTimeout(() => {
      this.isPlay = true;
      this.startAudio();
    }, 1700);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
