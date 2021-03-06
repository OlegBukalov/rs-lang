import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from 'src/app/core/shared/shared.module';
import { GameListComponent } from './game-list.component';
import { GameItemComponent } from './game-item/game-item.component';
import { gamesRoutes } from './games-routes';
import { CardGameItemComponent } from './card-game/card-game-item/card-game-item.component';
import { CardGameComponent } from './card-game/card-game.component';
import { CardGameExitModalComponent } from './card-game/card-game-exit-modal/card-game-exit-modal.component';
import { AudioCallComponent } from './audio-call/audio-call.component';
import { AudioCallStartComponent } from './audio-call/audio-call-start/audio-call-start.component';
import { AudioCallGameComponent } from './audio-call/audio-call-game/audio-call-game.component';
import { AudioCallEndComponent } from './audio-call/audio-call-end/audio-call-end.component';
import { SprintGameComponent } from './sprint-game/sprint-game.component';
import { SettingsPageComponent } from './sprint-game/settings-page/settings-page.component';
import { StartLoadingComponent } from './sprint-game/start-loading/start-loading.component';
import { BonusScoreComponent } from './sprint-game/bonus-score/bonus-score.component';
import { SavannahGameComponent } from './savannah-game/savannah-game.component';
import { SprintGameOverComponent } from './sprint-game/sprint-game-over/sprint-game-over.component';

@NgModule({
  declarations: [
    GameListComponent,
    GameItemComponent,
    CardGameComponent,
    CardGameItemComponent,
    CardGameExitModalComponent,
    AudioCallComponent,
    AudioCallStartComponent,
    AudioCallGameComponent,
    AudioCallEndComponent,
    SprintGameComponent,
    SettingsPageComponent,
    StartLoadingComponent,
    BonusScoreComponent,
    SavannahGameComponent,
    SprintGameOverComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(gamesRoutes),
    FormsModule,
    MatMenuModule,
    MatCardModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatTooltipModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    SharedModule,
  ],
  providers: [],
})
export class GamesModule {}
