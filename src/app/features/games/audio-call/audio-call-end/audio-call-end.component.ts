import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IGameResult } from '../interfaces';

@Component({
  selector: 'app-audio-call-end',
  templateUrl: './audio-call-end.component.html',
  styleUrls: ['./audio-call-end.component.scss'],
})
export class AudioCallEndComponent {
  @Input() level: number;
  @Input() score: IGameResult;
  @Input() incorrect: number;

  @Output() repeatGame = new EventEmitter();

  repeat(): void {
    this.repeatGame.emit();
  }
}
