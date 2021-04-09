import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { StatisticsService } from '../statistics.service';
import { IDataGame } from '../interfaces/idata-game';

@Component({
  selector: 'app-statistics-day',
  templateUrl: './statistics-day.component.html',
  styleUrls: ['./statistics-day.component.scss'],
})
export class StatisticsDayComponent implements OnInit {
  data: IDataGame[];

  isEmpty = true; // TODO будет меняться в зависимости от наличия данных по обучению

  constructor(private router: Router, private statisticsService: StatisticsService) {}

  ngOnInit(): void {
    this.data = this.statisticsService.getData();
  }

  redirectToLink(link: string) {
    this.router.navigateByUrl(link);
  }
}
