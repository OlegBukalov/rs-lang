import { Routes } from '@angular/router';
import { NotFoundComponent } from '../not-found/not-found.component';
import { CardGameListComponent } from './card-game-list/card-game-list.component';
import { GameListComponent } from './game-list/game-list.component';

export const gamesRoutes: Routes = [
  { path: '', component: GameListComponent },
  { path: 'card-game', component: CardGameListComponent },
  { path: '**', component: NotFoundComponent },
];
