import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { GameListComponent } from './game-list/game-list.component';
import { GameItemComponent } from './game-item/game-item.component';
import { gamesRoutes } from './games-routes';

@NgModule({
  declarations: [ GameListComponent, GameItemComponent],
  imports: [CommonModule, RouterModule.forChild(gamesRoutes)],
})
export class GamesModule {}
