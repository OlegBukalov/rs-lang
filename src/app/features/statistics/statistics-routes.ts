import { Routes } from '@angular/router';

import { NotFoundComponent } from '../not-found/not-found.component';
import { StatisticsComponent } from './statistics.component';

export const statisticsRoutes: Routes = [
  { path: '', component: StatisticsComponent },
  { path: '**', component: NotFoundComponent }
];
