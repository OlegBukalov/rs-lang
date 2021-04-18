import { Component, ElementRef, Input, ViewChild, EventEmitter, Output } from '@angular/core';

import { IWord } from 'src/app/core/interfaces/iword';
import { OwnGameService } from '../services/own-game.service';

import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-card-game-item',
  templateUrl: './card-game-item.component.html',
  styleUrls: ['./card-game-item.component.scss'],
})
export class CardGameItemComponent {
  @Input() card?: IWord;
  @Input() isHiddenDataChild: boolean;
  @Input() isHiddenChildCard: boolean;
  @Output() checkCard: EventEmitter<IWord> = new EventEmitter();

  @ViewChild('audio') audioPlayerRef: ElementRef;

  isRotated = false;

  private readonly baseCardURL = environment.dataURL;

  constructor(private ownGameService: OwnGameService) {}

  checkItem(card: IWord): void {
    this.checkCard.emit(card);
  }

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
      this.isHiddenChildCard = true;
    }
  }
}
