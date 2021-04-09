import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sprint-game-over',
  templateUrl: './sprint-game-over.component.html',
  styleUrls: ['./sprint-game-over.component.scss'],
})
export class SprintGameOverComponent {
  @Input() score: number;

  @Input() wordCounter: number;

  @Input() correctWordCounter: number;

  @Output() startGame = new EventEmitter();

  @Output() exit = new EventEmitter();

  onStart(): void {
    this.startGame.emit();
  }

  onExit(): void {
    this.exit.emit();
  }
}
