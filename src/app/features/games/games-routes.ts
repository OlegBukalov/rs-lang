import { Routes } from '@angular/router';
import { NotFoundComponent } from '../not-found/not-found.component';
import { GameListComponent } from './game-list.component';
import { CardGameComponent } from './card-game/card-game.component';
import { ExitCardGameGuard } from './card-game/guards/exit-card-game.guard';
import { AudioCallComponent } from './audio-call/audio-call.component';
import { SprintGameComponent } from './sprint-game/sprint-game.component';
import { SavannahGameComponent } from './savannah-game/savannah-game.component';

export const gamesRoutes: Routes = [
  { path: '', component: GameListComponent },
  { path: 'savannah', component: SavannahGameComponent },
  { path: 'audio-call', component: AudioCallComponent },
  // заменить компоненту для игры sprint
  { path: 'sprint', component: SprintGameComponent },
  { path: 'card-game', component: CardGameComponent, canDeactivate: [ExitCardGameGuard] },
  { path: '**', component: NotFoundComponent },
];
