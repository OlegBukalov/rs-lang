import { EventEmitter, Component, Input, OnDestroy, OnInit, Output } from '@angular/core';

import { Subscription } from 'rxjs';
import { IWord } from 'src/app/core/interfaces/iword';
import { ToasterService } from 'src/app/core/services/toaster.service';
import { AudioCallService } from '../audio-call.service';
import { IGameResult, IWordChunk } from '../interfaces';
import {
  WORDS_CHUNK_LENGTH,
  WORDS_CHUNK_PAGES_QUANTITY,
  ANSWERS_QUANTITY,
  INCORRECT_ANSWERS_QUANTITY,
  MAX_INCORRECT_ANSWERS_TO_LOOSE,
  ANSWER_BUTTON_DELAY,
} from '../constants';

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

  private markedWords: IWordChunk[];

  currentTask: IWordChunk[];

  currentAnswer: IWordChunk;

  private currentAnswerPosition: number;

  audioLoaded = false;

  showErrorMessage = false;

  private subscription = new Subscription();

  constructor(private gameService: AudioCallService, private toaster: ToasterService) {}

  ngOnInit() {
    this.createWordsChunk(this.level, this.page);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private createWordsChunk(level, page): void {
    this.subscription.add(
      this.gameService.getWords(level, page).subscribe(
        (data: IWord[]) => {
          this.words = data;
          this.addShownProperty();
          if (!this.currentTask) this.createCurrentTask();
        },
        () => {
          this.showErrorMessage = true;
          this.toaster.showError(
            'Что-то пошло не так. Проверьте свое Интернет-соединение.',
            'Ошибка!',
          );
        },
      ),
    );
  }

  private addShownProperty(): void {
    this.markedWords = this.words.map((element) => {
      return { ...element, isShown: false };
    });
  }

  private generateRandomIncorrectAnswers(): number[] {
    const taskSet = new Set<number>();
    while (taskSet.size <= INCORRECT_ANSWERS_QUANTITY) {
      taskSet.add(Math.floor(WORDS_CHUNK_LENGTH * Math.random()));
    }

    return [...taskSet];
  }

  private createCurrentTask(): void {
    const randomAnswersArray = this.generateRandomIncorrectAnswers();
    const taskArrayWords = randomAnswersArray.map((element) => {
      return this.markedWords[+element];
    });
    this.currentTask = taskArrayWords;
    this.currentAnswer = this.createCurrentAnswer();
    this.currentAnswerPosition = Math.floor(ANSWERS_QUANTITY * Math.random());
    this.currentTask.splice(this.currentAnswerPosition, 0, this.currentAnswer);
    this.clearButtonsStyles();
    this.wordCounter += 1;
    this.audioLoaded = false;
  }

  private createCurrentAnswer(): IWordChunk {
    const wordsWithoutAnswers = this.markedWords.filter(
      (word) => this.currentTask.indexOf(word) < 0,
    );
    const sortedWords = wordsWithoutAnswers.filter((word) => !word.isShown);
    const shuffledWords = sortedWords.sort(() => Math.random() - 0.5);
    shuffledWords[0].isShown = true;
    return shuffledWords[0];
  }

  onAnswer(answerIndex: number, event): void {
    this.goToNewPageOfWords();

    if (this.isAnswerCorrect(answerIndex)) {
      this.onCorrectAnswer(event);
    } else {
      this.onIncorrectAnswer(event);
    }
  }

  private isAnswerCorrect(index): boolean {
    return this.currentAnswerPosition === index;
  }

  private onCorrectAnswer(event): void {
    this.correctWordCounter += 1;
    this.currentCorrectSequence += 1;
    if (this.currentCorrectSequence > this.maxCorrectSequence) {
      this.maxCorrectSequence = this.currentCorrectSequence;
    }
    event.target.classList.add('answers__button_correct');
    setTimeout(() => {
      this.createCurrentTask();
    }, ANSWER_BUTTON_DELAY);
  }

  private onIncorrectAnswer(event): void {
    this.incorrect += 1;
    this.currentCorrectSequence = 0;
    event.target.classList.add('answers__button_incorrect');
    if (this.incorrect >= MAX_INCORRECT_ANSWERS_TO_LOOSE) {
      this.onLooseGame();
    }
  }

  private onLooseGame(): void {
    const gameResult: IGameResult = {
      wordCounter: this.wordCounter,
      correctWordCounter: this.correctWordCounter,
      maxCorrectSequence: this.maxCorrectSequence,
    };
    setTimeout(() => this.gameEnd.emit(gameResult), ANSWER_BUTTON_DELAY);
  }

  private goToNewPageOfWords(): void {
    if (this.areAllWordsShown()) {
      this.page += 1;
      if (this.page >= WORDS_CHUNK_PAGES_QUANTITY) {
        this.page = 0;
      }
      this.createWordsChunk(this.level, this.page);
    }
  }

  private areAllWordsShown(): boolean {
    const unShownnedWords = this.markedWords.filter((word) => !word.isShown);
    return unShownnedWords.length <= 1;
  }

  private clearButtonsStyles(): void {
    const buttons = document.querySelectorAll('.answers__button');
    buttons.forEach((button) => {
      button.classList.remove('answers__button_correct');
      button.classList.remove('answers__button_incorrect');
    });
  }

  onAudioLoad(): void {
    this.audioLoaded = true;
  }
}
