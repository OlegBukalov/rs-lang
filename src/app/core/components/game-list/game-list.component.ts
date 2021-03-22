import { Component, OnInit } from '@angular/core';

import { IGameItem } from './../../interfaces/igame-item';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent implements OnInit {

  gameList: IGameItem[] = [
    {
      id: 0,
      title: 'Саванна',
      imgUrl: ''
    },
    {
      id: 1,
      title: 'Аудиовызов',
      imgUrl: ''
    },
    {
      id: 2,
      title: 'Спринт',
      imgUrl: ''
    },
    {
      id: 3,
      title: 'Своя игра',
      imgUrl: ''
    },
  ]
  
  constructor() { }

  ngOnInit(): void {
  }

}
