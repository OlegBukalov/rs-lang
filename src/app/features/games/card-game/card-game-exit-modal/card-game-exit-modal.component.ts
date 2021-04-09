import { Component, Input, Output, EventEmitter } from '@angular/core';

import { IWord } from 'src/app/core/interfaces/iword';

@Component({
  selector: 'app-card-game-exit-modal',
  templateUrl: './card-game-exit-modal.component.html',
  styleUrls: ['./card-game-exit-modal.component.scss'],
})
export class CardGameExitModalComponent {
  @Input() hardWords: IWord[];
  @Output() closeModal = new EventEmitter();

  closeModalWindow() {
    this.closeModal.emit();
  }
}
