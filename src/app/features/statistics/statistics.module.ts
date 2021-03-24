import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { StatisticsComponent } from './statistics.component';
import { statisticsRoutes } from './statistics-routes'


@NgModule({
  declarations: [StatisticsComponent],
  imports: [CommonModule, RouterModule.forChild(statisticsRoutes)],
})
export class StatisticsModule {}
