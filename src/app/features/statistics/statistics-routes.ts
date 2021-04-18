import { Routes } from '@angular/router';

import { StatisticsComponent } from './statistics.component';
import { StatisticsDayComponent } from './statistics-day/statistics-day.component';
import { StatisticsAllComponent } from './statistics-all/statistics-all.component';

export const statisticsRoutes: Routes = [
  {
    path: '',
    component: StatisticsComponent,
    children: [
      { path: '', component: StatisticsDayComponent },
      { path: 'day', component: StatisticsDayComponent },
      { path: 'all', component: StatisticsAllComponent },
    ],
  },
];
