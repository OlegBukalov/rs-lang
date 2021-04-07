import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { GameListComponent } from './game-list.component';
import { GameItemComponent } from './game-item/game-item.component';
import { gamesRoutes } from './games-routes';
import { CardGameItemComponent } from './card-game-list/card-game-item/card-game-item.component';
import { CardGameListComponent } from './card-game-list/card-game-list.component';
import { AudioCallComponent } from './audio-call/audio-call.component';
import { AudioCallStartComponent } from './audio-call/audio-call-start/audio-call-start.component';
import { AudioCallGameComponent } from './audio-call/audio-call-game/audio-call-game.component';
import { AudioCallEndComponent } from './audio-call/audio-call-end/audio-call-end.component';
import { SprintGameComponent } from './sprint-game/sprint-game.component';
import { SettingsPageComponent } from './sprint-game/settings-page/settings-page.component';
import { StartLoadingComponent } from './sprint-game/start-loading/start-loading.component';
import { BonusScoreComponent } from './sprint-game/bonus-score/bonus-score.component';

@NgModule({
  declarations: [
    GameListComponent,
    GameItemComponent,
    CardGameListComponent,
    CardGameItemComponent,
    AudioCallComponent,
    AudioCallStartComponent,
    AudioCallGameComponent,
    AudioCallEndComponent,
    SprintGameComponent,
    SettingsPageComponent,
    StartLoadingComponent,
    BonusScoreComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(gamesRoutes),
    FormsModule,
    MatMenuModule,
    MatCardModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
  ],
  providers: [],
})
export class GamesModule {}
