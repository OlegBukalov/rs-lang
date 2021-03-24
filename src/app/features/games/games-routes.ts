import { Routes } from '@angular/router';
import { NotFoundComponent } from '../not-found/not-found.component';
import { GameListComponent } from './game-list/game-list.component';

export const gamesRoutes: Routes = [
  { path: '', component: GameListComponent },
  { path: '**', component: NotFoundComponent },
];
