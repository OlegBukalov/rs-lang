import { Routes } from '@angular/router';
import { NotFoundComponent } from '../not-found/not-found.component';
import { CardGameListComponent } from './card-game-list/card-game-list.component';
import { GameListComponent } from './game-list.component';
import { SprintGameComponent } from './sprint-game/sprint-game.component';

export const gamesRoutes: Routes = [
  { path: '', component: GameListComponent },
  // заменить компоненту для игры savannah
  { path: 'savannah', component: NotFoundComponent },
  // заменить компоненту для игры audio-call
  { path: 'audio-call', component: NotFoundComponent },
  { path: 'sprint', component: SprintGameComponent },
  { path: 'own-game', component: CardGameListComponent },
  { path: '**', component: NotFoundComponent },
];
