import { Component } from '@angular/core';

@Component({
  selector: 'app-sprint-game',
  templateUrl: './sprint-game.component.html',
  styleUrls: ['./sprint-game.component.scss'],
})
export class SprintGameComponent {
  score = 0;

  bonusScoreCounter = 2;

  bonusScoreLvl = 2;
}
