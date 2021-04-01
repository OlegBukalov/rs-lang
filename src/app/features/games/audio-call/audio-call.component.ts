import { Component } from '@angular/core';

@Component({
  selector: 'app-audio-call',
  templateUrl: './audio-call.component.html',
  styleUrls: ['./audio-call.component.scss'],
})
export class AudioCallComponent {
  gameStatus: string;

  level = 1;

  constructor() {
    this.gameStatus = 'start';
  }

  gameStart($event) {
    this.level = $event;
    this.gameStatus = 'game';
  }

  onChangeGameMode(mode): void {
    this.gameStatus = mode;
  }
}
