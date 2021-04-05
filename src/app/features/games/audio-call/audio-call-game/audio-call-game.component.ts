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
    this.resetTask();
    this.newTask.emit();
  }

  checkAnswer(e): void {
    const event = e;
    if (this.task.translation === event.target.textContent) {
      event.target.classList.add('answers__button_correct');
      setTimeout(() => {
        this.getNextTask();
      }, 500);
    } else {
      event.target.classList.add('answers__button_incorrect');
    }
  }

  resetTask() {
    this.task = {
      word: '',
      translation: '',
      correctIndex: 0,
      voiceFile: '',
      incorrectWords: ['loading...', 'loading...', 'loading...', 'loading...'],
      answers: ['loading...', 'loading...', 'loading...', 'loading...', 'loading...'],
    };
  }
}
