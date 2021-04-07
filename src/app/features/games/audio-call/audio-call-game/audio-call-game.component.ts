import {
  EventEmitter,
  Component,
  Input,
  Output,
  ViewChild,
  ElementRef,
  Renderer2,
  OnChanges,
  AfterViewInit,
} from '@angular/core';

import { AudioCallService } from '../audio-call.service';
import { IWordTask } from '../interfaces';

@Component({
  selector: 'app-audio-call-game',
  templateUrl: './audio-call-game.component.html',
  styleUrls: ['./audio-call-game.component.scss'],
})
export class AudioCallGameComponent implements OnChanges, AfterViewInit {
  @Input() level;

  @Input() task: IWordTask;

  @Output() newTask = new EventEmitter();

  @Output() endGame = new EventEmitter();

  @ViewChild('answers') answersElement: ElementRef;

  scores = 0;

  errors = 0;

  private answersButtons: Array<any>;

  constructor(private gameService: AudioCallService, private renderer: Renderer2) {}

  ngOnChanges() {
    if (this.answersElement) {
      this.initAnswers();
    }
  }

  ngAfterViewInit() {
    this.initAnswers();
  }

  initAnswers() {
    this.createAnswersButtons();
    this.renderAnswersButtons();
  }

  clearAnswers() {
    const buttons = this.answersElement.nativeElement.children;
    for (let i = 0; i < buttons.length; i += 1) {
      this.renderer.removeChild(this.answersElement.nativeElement, buttons.item(i));
    }
  }

  createAnswersButtons() {
    this.clearAnswers();
    this.answersButtons = this.task.answers.map((element) => {
      const button = this.renderer.createElement('button');
      const buttonText = this.renderer.createText(element);
      this.renderer.appendChild(button, buttonText);
      this.renderer.listen(button, 'click', (e) => this.checkAnswer(e));
      return button;
    });
  }

  renderAnswersButtons() {
    this.answersButtons.forEach((button) => {
      this.renderer.appendChild(this.answersElement.nativeElement, button);
    });
  }

  getNextTask(): void {
    this.newTask.emit();
  }

  checkAnswer(e): void {
    const event = e;
    if (this.task.translation === event.target.textContent) {
      event.target.classList.add('answers__button_correct');
      this.scores += 1;
      setTimeout(() => {
        this.getNextTask();
      }, 500);
    } else {
      event.target.classList.add('answers__button_incorrect');
      this.errors += 1;
      if (this.errors >= 5) {
        this.stopGame();
      }
    }
  }

  stopGame() {
    this.endGame.emit(this.errors);
  }
}
