import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { StatisticsComponent } from './statistics.component';
import { statisticsRoutes } from './statistics-routes';
import { StatisticsGroupComponent } from './statistics-group/statistics-group.component';
import { StatisticsDayComponent } from './statistics-day/statistics-day.component';
import { StatisticsAllComponent } from './statistics-all/statistics-all.component';

@NgModule({
  declarations: [
    StatisticsComponent,
    StatisticsGroupComponent,
    StatisticsDayComponent,
    StatisticsAllComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(statisticsRoutes)],
})
export class StatisticsModule {}
