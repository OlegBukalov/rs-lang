import { WordsApiService } from 'src/app/core/services/wordsApi.service';
import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { IGameState } from '../interfaces';

@Component({
  selector: 'app-audio-call-start',
  templateUrl: './audio-call-start.component.html',
  styleUrls: ['./audio-call-start.component.scss'],
})
export class AudioCallStartComponent implements OnInit {
  isTextbookGameOpen: boolean;

  level = 0;

  page = 0;

  readonly levels: number[] = [0, 1, 2, 3, 4, 5];

  @Output() startNewGame = new EventEmitter();

  constructor(private wordsApiService: WordsApiService) {}

  ngOnInit(): void {
    this.isTextbookGameOpen = this.wordsApiService.getTextbookGameOpenFlag();
    if (this.isTextbookGameOpen) {
      this.level = this.wordsApiService.getGroupToken();
      this.page = this.wordsApiService.getPageToken();
    }
  }

  onStartClick(): void {
    const initialGameState: IGameState = {
      level: this.level,
      page: this.page,
    };
    this.startNewGame.emit(initialGameState);
  }
}
