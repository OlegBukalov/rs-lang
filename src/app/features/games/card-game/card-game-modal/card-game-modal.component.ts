import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-card-game-modal',
  templateUrl: 'card-game-modal.component.html',
  styleUrls: ['./card-game-modal.component.scss'],
})
export class DialogElementsExampleDialogComponent {
  constructor(private dialogRef: MatDialogRef<DialogElementsExampleDialogComponent>) {}

  close(isSure: boolean) {
    this.dialogRef.close(isSure);
  }
}
