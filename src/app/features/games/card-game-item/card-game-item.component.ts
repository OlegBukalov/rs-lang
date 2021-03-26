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

  readonly baseCardURL = 'https://raw.githubusercontent.com/Oubowen/rslang-data/master/';

  playAudio() {
    this.audioPlayerRef.nativeElement.play();
  }
}
