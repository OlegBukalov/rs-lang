import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { TextByLevel } from '../constants/textByLvl';
import { ScoreCounters } from '../constants/scoreCounters';

@Component({
  selector: 'app-bonus-score',
  templateUrl: './bonus-score.component.html',
  styleUrls: ['./bonus-score.component.scss'],
})
export class BonusScoreComponent implements OnInit, OnChanges {
  @Input() scoreCounter: number;

  @Input() scoreLvl: number;

  lvlText = TextByLevel[0];

  scoreCounters = ScoreCounters;

  ngOnChanges(): void {
    this.changeLvlText(this.scoreLvl);
  }

  ngOnInit(): void {
    this.changeLvlText(this.scoreLvl);
  }

  private changeLvlText(scoreLvl: number) {
    this.lvlText = TextByLevel[scoreLvl];
  }
}
