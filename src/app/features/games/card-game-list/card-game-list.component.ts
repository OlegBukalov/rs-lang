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
  index: number;
  isPlay = true;
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
    if (this.isPlay) {
      this.index = Math.floor(Math.random() * this.words.length);
      const audioInstance = new Audio();
      audioInstance.src = `${this.baseCardURL + this.words[this.index].audio}`;
      audioInstance.play();
      this.words.splice(this.index, 1);
      this.isPlay = false;
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
