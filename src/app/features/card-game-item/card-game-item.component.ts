import { Component, Input, OnInit } from '@angular/core';
import { IWord } from 'src/app/core/interfaces/iword';

@Component({
  selector: 'app-card-game-item',
  templateUrl: './card-game-item.component.html',
  styleUrls: ['./card-game-item.component.scss'],
})
export class CardGameItemComponent implements OnInit {
  @Input() card: IWord;

  cardTitle = '';

  cardImage = '';

  cardAudio = '';

  baseCardURL = 'https://raw.githubusercontent.com/Oubowen/rslang-data/master/';

  ngOnInit(): void {
    this.cardImage = this.card.image;
    this.cardTitle = this.card.word;
    this.cardAudio = this.card.audio;
  }
}
