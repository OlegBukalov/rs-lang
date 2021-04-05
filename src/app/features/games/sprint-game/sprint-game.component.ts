import { Component } from '@angular/core';
import { IWord } from 'src/app/core/interfaces/iword';
import { ISprintWord } from './interfaces/sprint-word';
import { GameStatuses } from './enums/game-statuses.enum';
import { WordsApiService } from 'src/app/core/services/wordsApi.service';
import { ToasterService } from 'src/app/core/services/toaster.service';

@Component({
  selector: 'app-sprint-game',
  templateUrl: './sprint-game.component.html',
  styleUrls: ['./sprint-game.component.scss'],
})
export class SprintGameComponent {
  score = 0;
  gameStatus = GameStatuses.Play;
  words: IWord[];
  gameWords: ISprintWord[] = [];
  currentWord: ISprintWord;

  constructor(
    private wordsApiService: WordsApiService,
    private toastrService: ToasterService
  ) {
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
    this.gameStatus = GameStatuses.Play;
    this.wordsApiService.getWordList().subscribe(
      (words: IWord[]) => {
        if (words) {
          this.words = words.sort(() => Math.random() - 0.5);
          this.words.forEach((word, i) => {
            const isRandom: boolean = Math.random() < 0.5;
            let randomTranslate = isRandom ? this.words[Math.round(Math.random() * (this.words.length-1))].wordTranslate : word.wordTranslate;
            this.gameWords.push({
              id: word.id,
              word: word.word,
              translate: word.wordTranslate,
              randomTranslate: randomTranslate,
              correctTranslate: randomTranslate === word.wordTranslate,
              audio: word.audio,
            });
          });
          this.currentWord = this.gameWords[0];
        }
    },
    (err) => this.toastrService.showError(err, 'Не удалось получить слова для изучения, попробуйте позже.')
    )
  }

  setEndStatus(): void {
    this.gameStatus = GameStatuses.End;
  }

  checkAnswer(): void {

  }
}
