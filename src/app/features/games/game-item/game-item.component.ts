import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { IGameItem } from '../../../core/interfaces/igame-item';

@Component({
  selector: 'app-game-item',
  templateUrl: './game-item.component.html',
  styleUrls: ['./game-item.component.scss'],
})
export class GameItemComponent {
  @Input() public gameItem: IGameItem;

  constructor(private router: Router) {}

  redirectToGame(): void {
    this.router.navigate(['games', this.gameItem.titleEn]);
  }
}
