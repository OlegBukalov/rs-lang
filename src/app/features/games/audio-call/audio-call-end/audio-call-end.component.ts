import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-audio-call-end',
  templateUrl: './audio-call-end.component.html',
  styleUrls: ['./audio-call-end.component.scss'],
})
export class AudioCallEndComponent {
  @Input() level;
  @Input() score;
  @Input() incorrect;

  @Output() repeatGame = new EventEmitter();
  repeat() {
    this.repeatGame.emit();
  }
}
