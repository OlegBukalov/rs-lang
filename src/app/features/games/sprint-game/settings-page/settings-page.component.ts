import { Component, EventEmitter, Input, Output } from '@angular/core';
import { WordsApiService } from '../../../../core/services/wordsApi.service';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss'],
})
export class SettingsPageComponent {
  @Input() isTextbookGameOpen: boolean;

  @Output() startGame = new EventEmitter();

  readonly levels = [1, 2, 3, 4, 5, 6];

  constructor(private wordsApiService: WordsApiService) {}

  chooseLvl(lvl: number): void {
    this.wordsApiService.changeGroupToken((lvl - 1).toString());
    this.wordsApiService.setRandomPage();
  }

  onStart(): void {
    this.startGame.emit();
  }
}
