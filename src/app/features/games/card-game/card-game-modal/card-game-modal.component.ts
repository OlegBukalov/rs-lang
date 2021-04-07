import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-card-game-modal',
  templateUrl: 'card-game-modal.component.html',
  styleUrls: ['./card-game-modal.component.scss'],
})
export class DialogElementsExampleDialogComponent {
  @Output() redirect = new EventEmitter();

  constructor(private dialogRef: MatDialogRef<DialogElementsExampleDialogComponent>) {}

  close() {
    this.dialogRef.close();
  }

  redirectEvent() {
    this.dialogRef.close();
    this.redirect.emit();
  }
}
