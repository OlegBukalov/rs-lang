import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GameListComponent } from './game-list/game-list.component';
import { GameItemComponent } from './game-item/game-item.component';
import { gamesRoutes } from './games-routes';
import { CardGameItemComponent } from './card-game/card-game-item/card-game-item.component';
import { CardGameComponent } from './card-game/card-game.component';
import { CardGameExitModalComponent } from './card-game/card-game-exit-modal/card-game-exit-modal.component';

@NgModule({
  declarations: [
    GameListComponent,
    GameItemComponent,
    CardGameComponent,
    CardGameItemComponent,
    CardGameExitModalComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(gamesRoutes)],
  providers: [],
})
export class GamesModule {}
