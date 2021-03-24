import { Component, Input } from '@angular/core';

import { IGameItem } from '../../../core/interfaces/igame-item';

@Component({
  selector: 'app-game-item',
  templateUrl: './game-item.component.html',
  styleUrls: ['./game-item.component.scss'],
})
export class GameItemComponent {
  @Input() public gameItem: IGameItem;
}
