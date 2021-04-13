import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { OwnGameService } from '../services/own-game.service';

@Component({
  selector: 'app-card-game-modal',
  templateUrl: 'card-game-modal.component.html',
  styleUrls: ['./card-game-modal.component.scss'],
})
export class DialogElementsExampleDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<DialogElementsExampleDialogComponent>,
    private ownGameService: OwnGameService,
  ) {}

  close(isSure: boolean) {
    this.dialogRef.close(isSure);
  }
}
