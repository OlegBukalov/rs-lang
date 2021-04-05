import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { IWord } from 'src/app/core/interfaces/iword';
import { WordsApiService } from 'src/app/core/services/wordsApi.service';
import { ToasterService } from 'src/app/core/services/toaster.service';
import { ISprintWord } from './interfaces/sprint-word';
import { GameStatuses } from './enums/game-statuses.enum';

@Component({
  selector: 'app-sprint-game',
  templateUrl: './sprint-game.component.html',
  styleUrls: ['./sprint-game.component.scss'],
})
export class SprintGameComponent {
  score = 0;

  bonusScoreCounter = 0;

  bonusScoreLvl = 0;

  wordCounter = 0;

  gameStatus = GameStatuses.Play;

  words: IWord[];

  gameWords: ISprintWord[] = [];

  currentWord: ISprintWord;

  private subscriptionWords: Subscription;

  constructor(private wordsApiService: WordsApiService, private toastrService: ToasterService) {
    this.currentWord = {
      id: '',
      word: '',
      translate: '',
      randomTranslate: '',
      correctTranslate: false,
      audio: '',
    };
  }

  setLoadingStatus(): void {
    this.gameStatus = GameStatuses.Loading;
  }

  setPlayStatus(): void {
    this.score = 0;
    this.bonusScoreCounter = 0;
    this.bonusScoreLvl = 0;
    this.wordCounter = 0;
    this.gameWords = [];
    this.gameStatus = GameStatuses.Play;
    this.subscriptionWords = this.wordsApiService.getWordList().subscribe(
      (words: IWord[]) => {
        if (words) {
          this.words = words.sort(() => Math.random() - 0.5);
          this.words.forEach((word) => {
            const isRandom: boolean = Math.random() < 0.5;
            const randomTranslate = isRandom
              ? this.words[Math.round(Math.random() * (this.words.length - 1))].wordTranslate
              : word.wordTranslate;
            this.gameWords.push({
              id: word.id,
              word: word.word,
              translate: word.wordTranslate,
              randomTranslate,
              correctTranslate: randomTranslate === word.wordTranslate,
              audio: word.audio,
            });
          });
          [this.currentWord] = this.gameWords;
        }
      },
      (err) =>
        this.toastrService.showError(
          err,
          'Не удалось получить слова для изучения, попробуйте позже.',
        ),
    );
  }

  setEndStatus(): void {
    this.subscriptionWords.unsubscribe();
    this.gameStatus = GameStatuses.End;
    this.bonusScoreCounter = 0;
    this.bonusScoreLvl = 0;
    this.wordCounter = 0;
    this.gameWords = [];
  }

  checkAnswer(answer: boolean): void {
    this.wordCounter += 1;
    if (this.currentWord.correctTranslate === answer) {
      this.score += 10 * 2 ** this.bonusScoreLvl;
      if (this.bonusScoreCounter < 3) {
        // добавляем чек картинку
        this.bonusScoreCounter += 1;
      } else {
        // если 3 чека собрали - переходим на next lvl
        this.bonusScoreCounter = 0;
        if (this.bonusScoreLvl < 3) {
          this.bonusScoreLvl += 1;
        } else {
          // достигнут max lxl
          this.bonusScoreCounter = 1;
        }
      }
    } else {
      this.bonusScoreLvl = 0;
      this.bonusScoreCounter = 0;
    }
    if (this.wordCounter === this.gameWords.length) {
      this.setEndStatus();
    } else {
      const rurrentIndex = this.gameWords.indexOf(this.currentWord) + 1;
      this.currentWord = this.gameWords[rurrentIndex];
    }
  }
}
