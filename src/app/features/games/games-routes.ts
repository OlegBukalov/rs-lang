import { Routes } from '@angular/router';
import { NotFoundComponent } from '../not-found/not-found.component';
import { AudioCallComponent } from './audio-call/audio-call.component';
import { CardGameListComponent } from './card-game-list/card-game-list.component';
import { GameListComponent } from './game-list/game-list.component';

export const gamesRoutes: Routes = [
  { path: '', component: GameListComponent },
  // заменить компоненту для игры savannah
  { path: 'savannah', component: NotFoundComponent },
  // заменить компоненту для игры audio-call
  { path: 'audio-call', component: AudioCallComponent },
  // заменить компоненту для игры sprint
  { path: 'sprint', component: NotFoundComponent },
  { path: 'own-game', component: CardGameListComponent },
  { path: '**', component: NotFoundComponent },
];
