import { Component } from '@angular/core';

import { IGameItem } from '../../interfaces/igame-item';

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
      imgUrl: '../assets/img/game_savanna.jpg',
    },
    {
      id: 1,
      title: 'Аудиовызов',
      imgUrl: '../assets/img/game_audio.jpg',
    },
    {
      id: 2,
      title: 'Спринт',
      imgUrl: '../assets/img/game_sprint.jpg',
    },
    {
      id: 3,
      title: 'Своя игра',
      imgUrl: '../assets/img/game_me.jpg',
    },
  ];
}
