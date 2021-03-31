import { Routes } from '@angular/router';
import { NotFoundComponent } from '../not-found/not-found.component';
import { CardGameListComponent } from './card-game-list/card-game-list.component';
import { GameListComponent } from './game-list/game-list.component';
import { ExitCardGameGuard } from './guards/exit-card-game.guard';

export const gamesRoutes: Routes = [
  { path: '', component: GameListComponent },
  // заменить компоненту для игры savannah
  { path: 'savannah', component: NotFoundComponent },
  // заменить компоненту для игры audio-call
  { path: 'audio-call', component: NotFoundComponent },
  // заменить компоненту для игры sprint
  { path: 'sprint', component: NotFoundComponent },
  { path: 'card-game', component: CardGameListComponent, canDeactivate: [ExitCardGameGuard] },
  { path: '**', component: NotFoundComponent },
];
