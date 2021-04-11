import { EventEmitter, Component, Input, OnDestroy, OnInit, Output } from '@angular/core';

import { Subscription } from 'rxjs';
import { IWord } from 'src/app/core/interfaces/iword';
import { AudioCallService } from '../audio-call.service';
import { IGameResult, IWordChunk } from '../interfaces';

@Component({
  selector: 'app-audio-call-game',
  templateUrl: './audio-call-game.component.html',
  styleUrls: ['./audio-call-game.component.scss'],
})
export class AudioCallGameComponent implements OnInit, OnDestroy {
  @Input() level;

  @Output() gameEnd = new EventEmitter();

  page = 0;

  incorrect = 0;

  wordCounter = 0;

  correctWordCounter = 0;

  currentCorrectSequence = 0;

  maxCorrectSequence = 0;

  words: IWord[];

  markedWords: IWordChunk[];

  currentTask: IWordChunk[];

  currentAnswer: IWordChunk;

  currentAnswerPosition: number;

  private subscription = new Subscription();

  constructor(private gameService: AudioCallService) {}

  ngOnInit() {
    this.createWordsChunk(this.level, this.page);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  createWordsChunk(level, page): void {
    this.subscription.add(
      this.gameService.getWords(level, page).subscribe((data: IWord[]) => {
        this.words = data;
        this.addShownProperty();
        if (!this.currentTask) this.createCurrentTask();
      }),
    );
  }

  addShownProperty(): void {
    this.markedWords = this.words.map((element) => {
      return { ...element, isShown: false };
    });
  }

  generateTaskArr() {
    const taskSet = new Set();
    while (taskSet.size <= 3) {
      taskSet.add(Math.floor(20 * Math.random()));
    }

    return [...taskSet];
  }

  createCurrentTask(): void {
    const taskArray = this.generateTaskArr();
    const taskArrayWords = taskArray.map((element) => {
      return this.markedWords[+element];
    });
    this.currentTask = taskArrayWords;
    this.currentAnswer = this.createCurrentAnswer();
    this.currentAnswerPosition = Math.floor(5 * Math.random());
    this.currentTask.splice(this.currentAnswerPosition, 0, this.currentAnswer);
    this.clearButtonsStyles();
    this.wordCounter += 1;
  }

  createCurrentAnswer(): IWordChunk {
    const wordsWithoutAnswers = this.markedWords.filter(
      (word) => this.currentTask.indexOf(word) < 0,
    );
    const sortedWords = wordsWithoutAnswers.filter((word) => !word.isShown);
    const shuffledWords = sortedWords.sort(() => Math.random() - 0.5);
    shuffledWords[0].isShown = true;
    return shuffledWords[0];
  }

  onAnswer(i, event): void {
    if (this.checkAnswer(i)) {
      this.correctWordCounter += 1;
      this.currentCorrectSequence += 1;
      if (this.currentCorrectSequence > this.maxCorrectSequence) {
        this.maxCorrectSequence = this.currentCorrectSequence;
      }
      event.target.classList.add('answers__button_correct');
      setTimeout(() => {
        this.createCurrentTask();
      }, 500);
    } else {
      this.incorrect += 1;
      this.currentCorrectSequence = 0;
      event.target.classList.add('answers__button_incorrect');
      if (this.incorrect >= 5) {
        const gameResult: IGameResult = {
          wordCounter: this.wordCounter,
          correctWordCounter: this.correctWordCounter,
          maxCorrectSequence: this.maxCorrectSequence,
        };
        setTimeout(() => this.gameEnd.emit(gameResult), 500);
      }
    }

    if (this.checkShownedWords() <= 1) {
      this.page += 1;
      if (this.page >= 30) {
        this.page = 0;
      }
      this.createWordsChunk(this.level, this.page);
    }
  }

  checkAnswer(index): boolean {
    return this.currentAnswerPosition === index;
  }

  clearButtonsStyles(): void {
    const buttons = document.querySelectorAll('.answers__button');
    buttons.forEach((button) => {
      button.classList.remove('answers__button_correct');
      button.classList.remove('answers__button_incorrect');
    });
  }

  checkShownedWords(): number {
    const unShownnedWords = this.markedWords.filter((word) => !word.isShown);
    return unShownnedWords.length;
  }
}
