/* eslint-disable @typescript-eslint/lines-between-class-members */
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
// import { tap } from 'rxjs/operators';
import { IWord } from 'src/app/core/interfaces/iword';
import { WordsApiService } from 'src/app/core/services/wordsApi.service';

@Component({
  selector: 'app-card-game-list',
  templateUrl: './card-game-list.component.html',
  styleUrls: ['./card-game-list.component.scss'],
})
export class CardGameListComponent implements OnInit {
  wordList: Observable<IWord[]>;
  words: IWord[];
  index: number;
  isPlay = true;

  readonly baseCardURL = 'https://raw.githubusercontent.com/Oubowen/rslang-data/master/';

  constructor(private wordsApiService: WordsApiService) {}

  ngOnInit(): void {
    this.wordList = this.wordsApiService.getWordList();
    // eslint-disable-next-line no-return-assign
    this.wordList.subscribe((words) => (this.words = words));
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
}
