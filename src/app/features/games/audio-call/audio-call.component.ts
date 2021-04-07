import { Component, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';
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
export class AudioCallComponent implements OnDestroy {
  gameStatus: string;

  level = 1;

  page = 0;

  totalScores = 0;

  words: IWord[];

  wordsArray: IWordsInCallGame[];

  singleTask: IWordTask;

  private subscription = new Subscription();

  constructor(private gameService: AudioCallService) {
    this.gameStatus = GameStatus.Start;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  gameStart(level: number): void {
    this.level = level;
    this.page = 0;
    this.getWords(this.level, this.page);
    this.gameStatus = GameStatus.Game;
  }

  getWords(level, page): void {
    this.subscription.add(
      this.gameService.getWords(level, page).subscribe((data: IWord[]) => {
        this.words = data;
        this.wordsArray = this.createTasks();
        this.singleTask = this.createTask();
        this.markWordAsShown(this.singleTask.correctIndex);
      }),
    );
  }

  createTasks(): IWordsInCallGame[] {
    return this.gameService.createTasks(this.words);
  }

  createTask(): IWordTask {
    return this.gameService.createTask(this.wordsArray);
  }

  onNewGameBegin() {
    this.level = 1;
    this.page = 0;
    this.totalScores = 0;
    this.gameStatus = GameStatus.Start;
  }

  onCreateNewTask(): void {
    this.singleTask = this.createTask();
    this.markWordAsShown(this.singleTask.correctIndex);
    if (this.checkUnshownWords()) {
      this.page += 1;
      this.getWords(this.level, this.page);
    }
  }

  onEndGame(e) {
    this.totalScores = e;
    this.gameStatus = GameStatus.End;
  }

  markWordAsShown(index: number): void {
    this.wordsArray[index].isShown = true;
  }

  checkUnshownWords(): boolean {
    return this.gameService.countShown(this.wordsArray);
  }
}
