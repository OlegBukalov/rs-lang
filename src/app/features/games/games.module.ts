import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GameListComponent } from './game-list/game-list.component';
import { GameItemComponent } from './game-item/game-item.component';
import { gamesRoutes } from './games-routes';
import { CardGameItemComponent } from './card-game-item/card-game-item.component';
import { CardGameListComponent } from './card-game-list/card-game-list.component';
import { SavannaGameComponent } from './savanna-game/savanna-game.component';
import { MaterialModule } from 'src/app/material.module';
@NgModule({
  declarations: [
    GameListComponent,
    GameItemComponent,
    CardGameListComponent,
    CardGameItemComponent,
    SavannaGameComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(gamesRoutes), MaterialModule],
  providers: [],
})
export class GamesModule {}
