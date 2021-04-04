import { EventEmitter, Component, Input, Output } from '@angular/core';

import { AudioCallService } from '../audio-call.service';
import { IWordTask } from '../interfaces';

@Component({
  selector: 'app-audio-call-game',
  templateUrl: './audio-call-game.component.html',
  styleUrls: ['./audio-call-game.component.scss'],
})
export class AudioCallGameComponent {
  @Input() level;

  @Input() task: IWordTask | null;

  @Output() newTask = new EventEmitter();

  constructor(private gameService: AudioCallService) {}

  getNextTask(): void {
    this.newTask.emit();
  }

  checkAnswer(e): void {
    const event = e;
    if (this.task.translation === event.target.textContent) {
      event.target.style.background = 'green';
      setTimeout(() => {
        event.target.style.background = 'none';
        this.getNextTask();
      }, 500);
    } else {
      event.target.style.background = 'red';
    }
  }
}
