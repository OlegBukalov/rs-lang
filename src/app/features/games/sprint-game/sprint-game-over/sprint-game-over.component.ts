import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sprint-game-over',
  templateUrl: './sprint-game-over.component.html',
  styleUrls: ['./sprint-game-over.component.scss'],
})
export class SprintGameOverComponent {
  @Input() score: number;

  @Input() wordCounter: number;

  @Input() correctWordCounter: number;
}
