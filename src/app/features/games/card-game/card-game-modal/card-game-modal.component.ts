/* eslint-disable @typescript-eslint/lines-between-class-members */
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-card-game-modal',
  templateUrl: 'card-game-modal.component.html',
})
export class DialogElementsExampleDialogComponent {
  @Input() isSaved: boolean;
  @Output() exitGameModal = new EventEmitter();
  @Output() continueGameModal = new EventEmitter();

  exitGameModalWindow() {
    this.exitGameModal.emit();
  }

  continueGameModalWindow() {
    this.continueGameModal.emit();
  }
}
