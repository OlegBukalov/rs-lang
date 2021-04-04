/* eslint-disable @typescript-eslint/lines-between-class-members */
import { Component, ElementRef, Input, ViewChild } from '@angular/core';

import { IWord } from 'src/app/core/interfaces/iword';
import { GameState } from '../services/gameState.state';
import { OwnGameService } from '../services/own-game.service';

@Component({
  selector: 'app-card-game-item',
  templateUrl: './card-game-item.component.html',
  styleUrls: ['./card-game-item.component.scss'],
})
export class CardGameItemComponent {
  @Input() card?: IWord;
  @Input() currentState?: GameState = GameState.STOP;
  @Input() state = GameState;

  @ViewChild('audio') audioPlayerRef: ElementRef;

  isRotated = false;
  isDisabled = false;
  isPlay: boolean = this.currentState === this.state.PLAY;

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
    this.isRotated = true;
    setTimeout(() => {
      this.isRotated = false;
    }, 1300);
  }

  getDisable(card) {
    const item = this.ownGameService.getDisabledItemId();
    if (item === card.id) {
      this.isDisabled = true;
    }
  }
}
