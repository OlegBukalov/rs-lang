import { Component } from '@angular/core';

import { AudioCallService } from './audio-call.service';
import { IWord } from '../../../core/interfaces/iword';
import { IWordsInCallGame, IWordTask } from './interfaces';

enum GameStatus {
  Start = 'start',
  Game = 'game',
  End = 'end',
}

@Component({
  selector: 'app-audio-call',
  templateUrl: './audio-call.component.html',
  styleUrls: ['./audio-call.component.scss'],
})
export class AudioCallComponent {
  gameStatus: string;

  level = 1;

  words: IWord[];

  wordsArray: IWordsInCallGame[];

  singleTask: IWordTask;

  constructor(private gameService: AudioCallService) {
    this.gameStatus = GameStatus.Start;
  }

  gameStart(level: number): void {
    this.level = level;
    this.getWords(this.level);
    this.gameStatus = GameStatus.Game;
  }

  getWords(level): void {
    this.gameService.getWords(level).subscribe((data: IWord[]) => {
      this.words = data;
    });
  }

  createTask() {}
}
