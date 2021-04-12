import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-audio-call-start',
  templateUrl: './audio-call-start.component.html',
  styleUrls: ['./audio-call-start.component.scss'],
})
export class AudioCallStartComponent {
  level = 1;

  readonly levels = [1, 2, 3, 4, 5, 6];

  @Output() startNewGame = new EventEmitter();

  onStartClick() {
    this.startNewGame.emit(this.level);
  }
}
