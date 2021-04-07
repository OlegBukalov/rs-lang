import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-audio-call-end',
  templateUrl: './audio-call-end.component.html',
  styleUrls: ['./audio-call-end.component.scss'],
})
export class AudioCallEndComponent {
  @Input() totalScores: number;

  @Output() beginNewGame = new EventEmitter();

  startNewGame() {
    this.beginNewGame.emit();
  }
}
