import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DictionaryComponent } from './dictionary.component';
import { dictionaryRoutes } from './dictionary-routes';

@NgModule({
  declarations: [DictionaryComponent],
  imports: [CommonModule, RouterModule.forChild(dictionaryRoutes)],
})
export class DictionaryModule {}
