/* eslint-disable @typescript-eslint/lines-between-class-members */
import { Component, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-card-game-modal',
  templateUrl: 'card-game-modal.component.html',
})
export class DialogElementsExampleDialogComponent {
  @Input() isSaved: boolean;

  constructor(private dialogRef: MatDialogRef<DialogElementsExampleDialogComponent>) {}

  close() {
    this.dialogRef.close();
  }
}
