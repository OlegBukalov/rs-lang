import { WordsApiService } from 'src/app/core/services/wordsApi.service';
import { Component, EventEmitter, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-audio-call-start',
  templateUrl: './audio-call-start.component.html',
  styleUrls: ['./audio-call-start.component.scss'],
})
export class AudioCallStartComponent implements OnInit {
  isTextbookGameOpen: boolean;

  level = 1;

  readonly levels: number[] = [1, 2, 3, 4, 5, 6];

  @Output() startNewGame = new EventEmitter();

  constructor(private wordsApiService: WordsApiService) {}

  ngOnInit(): void {
    this.isTextbookGameOpen = this.wordsApiService.getTextbookGameOpenFlag();
  }

  onStartClick(): void {
    this.startNewGame.emit(this.level);
  }
}
