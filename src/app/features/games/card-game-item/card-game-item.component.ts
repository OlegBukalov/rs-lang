/* eslint-disable @typescript-eslint/lines-between-class-members */
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
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

  private readonly baseCardURL = 'https://raw.githubusercontent.com/Oubowen/rslang-data/master/';

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
}
