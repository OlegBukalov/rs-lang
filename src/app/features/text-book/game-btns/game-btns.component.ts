import { WordsApiService } from 'src/app/core/services/wordsApi.service';
import { Router } from '@angular/router';
import { Component, Input } from '@angular/core';
import { IGameItem } from '../../../core/interfaces/igame-item';

@Component({
  selector: 'app-game-btns',
  templateUrl: './game-btns.component.html',
  styleUrls: ['./game-btns.component.scss'],
})
export class GameBtnsComponent {
  @Input() gameItem: IGameItem;

  constructor(private router: Router, private wordsApiService: WordsApiService) {}

  redirectToGame(): void {
    this.wordsApiService.setTextbookGameOpenFlag(true);
    this.router.navigate(['games', this.gameItem.titleEn]);
  }
}
