import { Component } from '@angular/core';

import { IGameItem } from '../../../core/interfaces/igame-item';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss'],
})
export class GameListComponent {
  gameList: IGameItem[] = [
    {
      id: 0,
      title: 'Саванна',
      imgUrl: '../assets/img/game_savannah.jpg',
      routerLink: 'savannah-game',
    },
    {
      id: 1,
      title: 'Аудиовызов',
      imgUrl: '../assets/img/game_audio.jpg',
      routerLink: 'card-game',
    },
    {
      id: 2,
      title: 'Спринт',
      imgUrl: '../assets/img/game_sprint.jpg',
      routerLink: 'card-game',
    },
    {
      id: 3,
      title: 'Своя игра',
      imgUrl: '../assets/img/game_me.jpg',
      routerLink: 'card-game',
    },
  ];
}
