import { Component, Input, OnInit } from '@angular/core';

enum BonusScoreLvlTexts {
  ZeroLvl = '',
  SecondLvl = '+20 очков за слово',
  ThirdLvl = '+40 очков за слово',
  FourthLvl = '+80 очков за слово',
}

const convertLvl = ['ZeroLvl', 'SecondLvl', 'ThirdLvl', 'FourthLvl'];

@Component({
  selector: 'app-bonus-score',
  templateUrl: './bonus-score.component.html',
  styleUrls: ['./bonus-score.component.scss']
})
export class BonusScoreComponent implements OnInit {
  @Input() bonusScoreCounter: number;

  @Input() bonusScoreLvl: number;

  bonusScoreLvlText = BonusScoreLvlTexts.ZeroLvl;

  ngOnInit(): void {
    this.changeLvlText(this.bonusScoreLvl)
  }

  changeLvlText(bonusScoreLvl: number) {
    this.bonusScoreLvlText = BonusScoreLvlTexts[convertLvl[bonusScoreLvl]];
  }
}
