import { Component } from '@angular/core';
import { DictionaryService } from 'src/app/core/services/dictionary.service';
import { StatisticsService } from '../../statistics/statistics.service';
import { IGameResult } from './interfaces';
import { GameID } from '../../statistics/enums/game-id.enum';
import { DictionaryCategory } from '../../dictionary/dictionary-category';

enum GameStatus {
  Start = 'start',
  Game = 'game',
  End = 'end',
}

@Component({
  selector: 'app-audio-call',
  templateUrl: './audio-call.component.html',
  styleUrls: ['./audio-call.component.scss'],
})
export class AudioCallComponent {
  gameStatus: string;

  level = 1;

  score: IGameResult;

  constructor(private statisticsService: StatisticsService, private dictionary: DictionaryService) {
    this.gameStatus = GameStatus.Start;
  }

  onGameStart(level: number): void {
    this.level = level;
    this.gameStatus = GameStatus.Game;
  }

  onGameEnd(score: IGameResult): void {
    this.score = score;
    const dataGame = {
      idGame: GameID.AudioCall,
      countAll: this.score.totalAnswersCounter,
      countRight: this.score.wordCounter - 1,
      maxRight: this.score.maxCorrectSequence,
    };
    const correctWordsIds = score.correctWords.map((word) => word.id);
    const incorrectWordsIds = score.wordsWithMistakes.map((word) => word.id);
    this.statisticsService.setDataFromGame(dataGame);
    this.dictionary.addWordsToDictionary(correctWordsIds, DictionaryCategory.Studied);
    this.dictionary.addWordsToDictionary(incorrectWordsIds, DictionaryCategory.Studied);
    this.gameStatus = GameStatus.End;
  }

  onGameRepeat(): void {
    this.score.wordCounter = 0;
    this.score.totalAnswersCounter = 0;
    this.score.correctWordCounter = 0;
    this.score.maxCorrectSequence = 0;
    this.level = 1;

    this.gameStatus = GameStatus.Start;
  }
}
