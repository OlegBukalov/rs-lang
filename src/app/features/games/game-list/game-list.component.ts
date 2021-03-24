import { Component } from '@angular/core';

import { IGameItem } from '../../../core/interfaces/igame-item';

import { GAMES_DESCRIPTION } from '../../../shared/mocks/data-game-description';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss'],
})
export class GameListComponent {

  gameList: IGameItem[] = GAMES_DESCRIPTION;

}
