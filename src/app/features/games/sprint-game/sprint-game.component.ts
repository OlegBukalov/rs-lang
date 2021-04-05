import { GameStatuses } from './enums/game-statuses.enum';
import { Component } from '@angular/core';

@Component({
  selector: 'app-sprint-game',
  templateUrl: './sprint-game.component.html',
  styleUrls: ['./sprint-game.component.scss'],
})
export class SprintGameComponent {
  score = 0;
  level = 1;
  gameStatus = GameStatuses.Start;

  private setLoadingStatus(lvl: number): void {
    this.gameStatus = GameStatuses.Loading;
    this.level = lvl;
  }

  private setPlayStatus(): void {
    this.gameStatus = GameStatuses.Play;
  }

  private setEndStatus(): void {
    this.gameStatus = GameStatuses.End;
  }
}
