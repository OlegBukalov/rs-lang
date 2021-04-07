import { Routes } from '@angular/router';

import { NotFoundComponent } from '../not-found/not-found.component';
import { DictionaryComponent } from './dictionary/dictionary.component';

export const dictionaryRoutes: Routes = [
  { path: '', component: DictionaryComponent },
  { path: '**', component: NotFoundComponent },
];
