/* eslint-disable @typescript-eslint/lines-between-class-members */
import { Component, ElementRef, Input, ViewChild } from '@angular/core';

import { OwnGameService } from 'src/app/core/services/own-game/own-game.service';

import { IWord } from 'src/app/core/interfaces/iword';

@Component({
  selector: 'app-card-game-item',
  templateUrl: './card-game-item.component.html',
  styleUrls: ['./card-game-item.component.scss'],
})
export class CardGameItemComponent {
  @Input() card?: IWord;

  @ViewChild('audio') audioPlayerRef: ElementRef;

  isRotate = false;
  isDisable = false;

  private readonly baseCardURL = 'https://raw.githubusercontent.com/Oubowen/rslang-data/master/';

  constructor(private ownGameService: OwnGameService) {}

  get cardImgSrc(): string {
    return this.card ? `${this.baseCardURL + this.card.image}` : '';
  }

  get cardAudioSrc(): string {
    return this.card ? `${this.baseCardURL + this.card.audio}` : '';
  }

  playAudio() {
    this.audioPlayerRef.nativeElement.play();
  }

  rotateCard() {
    this.isRotate = true;
    setTimeout(() => {
      this.isRotate = false;
    }, 1300);
  }

  getDisable(card) {
    const item = this.ownGameService.getItemDisable();
    if (item === card.id) {
      this.isDisable = true;
    }
  }
}
