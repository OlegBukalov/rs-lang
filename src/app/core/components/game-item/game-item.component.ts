import { Component, OnInit, Input } from '@angular/core';

import { IGameItem } from './../../interfaces/igame-item';

@Component({
  selector: 'app-game-item',
  templateUrl: './game-item.component.html',
  styleUrls: ['./game-item.component.scss']
})
export class GameItemComponent implements OnInit {
  @Input() public gameItem: IGameItem;

  constructor() { }

  ngOnInit(): void {
  }

}
