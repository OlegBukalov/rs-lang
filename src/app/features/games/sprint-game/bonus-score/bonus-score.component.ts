import { Component, Input } from '@angular/core';
import { TextByLevel } from '../constants/textByLvl';
import { SCORE_COUNTERS } from '../constants/scoreCounters';

@Component({
  selector: 'app-bonus-score',
  templateUrl: './bonus-score.component.html',
  styleUrls: ['./bonus-score.component.scss'],
})
export class BonusScoreComponent {
  @Input() scoreCounter: number;

  @Input() scoreLvl: number;

  get lvlText(): string {
    return TextByLevel[this.scoreLvl];
  }

  scoreCounters = SCORE_COUNTERS;
}
