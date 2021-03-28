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
  randomIndex: number;
  isPlay = true;
  isStartPlay = false;
  playingWord: IWord[];
  leftCards = 20;
  // TODO: fix change level
  // sixtLevel = '6';

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
      this.randomIndex = Math.floor(Math.random() * this.copyWords.length);
      const audioInstance = new Audio();
      audioInstance.src = `${this.baseCardURL + this.copyWords[this.randomIndex].audio}`;
      audioInstance.play();
      this.playingWord = this.copyWords.splice(this.randomIndex, 1);
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
    if (this.playingWord[0].audio === card.audio) {
      const audioInstance = new Audio();
      audioInstance.src = '../../../../assets/sounds/yes.mp3';
      audioInstance.play();
      this.leftCards -= 1;
      this.playNextWord();
    } else if (this.playingWord[0].audio !== card.audio) {
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

  // TODO: fix change level
  // changeLevel(level: string) {
  //   this.wordsApiService.changeGroupToken(level);
  // }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
