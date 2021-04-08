import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { SharedModule } from 'src/app/core/shared/shared.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { dictionaryRoutes } from './dictionary-routes';
import { DictionaryComponent } from './dictionary/dictionary.component';
import { DictionaryCardComponent } from './dictionary-card/dictionary-card.component';

@NgModule({
  declarations: [DictionaryComponent, DictionaryCardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(dictionaryRoutes),
    FormsModule,
    SharedModule,
    MatProgressSpinnerModule,
  ],
})
export class DictionaryModule {}
