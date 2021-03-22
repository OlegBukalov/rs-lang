import { Routes } from '@angular/router';
import { NotFoundComponent } from '../not-found/not-found.component';

import { GamesComponent } from './games.component';

export const gamesRoutes: Routes = [
  { path: '', component: GamesComponent },
  { path: '**', component: NotFoundComponent }
];
