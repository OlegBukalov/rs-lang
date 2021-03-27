/* eslint-disable @typescript-eslint/lines-between-class-members */
import { Component, ElementRef, Input, Output, ViewChild } from '@angular/core';
import { IWord } from 'src/app/core/interfaces/iword';

@Component({
  selector: 'app-card-game-item',
  templateUrl: './card-game-item.component.html',
  styleUrls: ['./card-game-item.component.scss'],
})
export class CardGameItemComponent {
  @Input() card?: IWord;
  @Output() passedCard?: IWord;

  @ViewChild('audio') audioPlayerRef: ElementRef;

  isRotate = false;

  readonly baseCardURL = 'https://raw.githubusercontent.com/Oubowen/rslang-data/master/';

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
