import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { GameListComponent } from './game-list/game-list.component';
import { GameItemComponent } from './game-item/game-item.component';
import { gamesRoutes } from './games-routes';
import { CardGameListComponent } from './card-game-list/card-game-list.component';
import { CardGameItemComponent } from './card-game-item/card-game-item.component';

@NgModule({
  declarations: [
    GameListComponent,
    GameItemComponent,
    CardGameListComponent,
    CardGameItemComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(gamesRoutes)],
  providers: [HttpClient],
})
export class GamesModule {}
