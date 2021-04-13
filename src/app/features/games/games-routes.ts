import { Routes } from '@angular/router';
import { NotFoundComponent } from '../not-found/not-found.component';
import { AudioCallComponent } from './audio-call/audio-call.component';
import { CardGameListComponent } from './card-game-list/card-game-list.component';
import { GameListComponent } from './game-list.component';
import { SprintGameComponent } from './sprint-game/sprint-game.component';
import { SavannahGameComponent } from './savannah-game/savannah-game.component';

export const gamesRoutes: Routes = [
  { path: '', component: GameListComponent },
  { path: 'savannah', component: SavannahGameComponent },
  { path: 'audio-call', component: AudioCallComponent },
  { path: 'sprint', component: SprintGameComponent },
  { path: 'own-game', component: CardGameListComponent },
  { path: '**', component: NotFoundComponent },
];
