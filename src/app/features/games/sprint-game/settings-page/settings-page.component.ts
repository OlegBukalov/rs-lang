import { Component, EventEmitter, Output } from '@angular/core';
import { WordsApiService } from '../../../../core/services/wordsApi.service';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss'],
})
export class SettingsPageComponent {
  @Output() startGame = new EventEmitter();

  levels = [1, 2, 3, 4, 5, 6];

  constructor(private wordsApiService: WordsApiService) {}

  private chooseLvl(lvl: number): void {
    this.wordsApiService.changeGroupToken(lvl.toString());
  }

  onStart(): void {
    const page = Math.round(Math.random() * 29);
    this.wordsApiService.changePageToken(page.toString());
    this.startGame.emit();
  }
}
