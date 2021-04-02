import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GameListComponent } from './game-list.component';
import { GameItemComponent } from './game-item/game-item.component';
import { gamesRoutes } from './games-routes';
import { CardGameItemComponent } from './card-game-list/card-game-item/card-game-item.component';
import { CardGameListComponent } from './card-game-list/card-game-list.component';
import { SprintGameComponent } from './sprint-game/sprint-game.component';
@NgModule({
  declarations: [
    GameListComponent,
    GameItemComponent,
    CardGameListComponent,
    CardGameItemComponent,
    SprintGameComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(gamesRoutes)],
  providers: [],
})
export class GamesModule {}
