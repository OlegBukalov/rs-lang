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

  page = 0;

  words: IWord[];

  wordsArray: IWordsInCallGame[];

  singleTask: IWordTask;

  constructor(private gameService: AudioCallService) {
    this.gameStatus = GameStatus.Start;
  }

  gameStart(level: number): void {
    this.level = level;
    this.page = 0;
    this.getWords(this.level, this.page);
    this.gameStatus = GameStatus.Game;
  }

  getWords(level, page): void {
    this.gameService.getWords(level, page).subscribe((data: IWord[]) => {
      this.words = data;
      this.wordsArray = this.createTasks();
      this.singleTask = this.createTask();
      this.markWordAsShown(this.singleTask.correctIndex);
    });
  }

  createTasks(): IWordsInCallGame[] {
    return this.gameService.createTasks(this.words);
  }

  createTask(): IWordTask {
    return this.gameService.createTask(this.wordsArray);
  }

  createNewTask() {
    this.singleTask = this.createTask();
    this.markWordAsShown(this.singleTask.correctIndex);
    if (this.checkUnshownWords()) {
      this.page += 1;
      this.getWords(this.level, this.page);
    }
  }

  markWordAsShown(index) {
    this.wordsArray[index].isShown = true;
  }

  checkUnshownWords() {
    return this.gameService.countShown(this.wordsArray);
  }
}
