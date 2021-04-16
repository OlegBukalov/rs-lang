import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { StatisticsService } from '../statistics.service';

import { IItemListGames } from '../interfaces/iitem-list-games';

@Component({
  selector: 'app-statistics-day',
  templateUrl: './statistics-day.component.html',
  styleUrls: ['./statistics-day.component.scss'],
})
export class StatisticsDayComponent implements OnInit {
  data: IItemListGames[];

  allRightAnswers: number;

  isEmpty = true;
  // TODO будет меняться в зависимости от наличия данных по обучению для отображения альтернативного контента

  constructor(private router: Router, private statisticsService: StatisticsService) {}

  ngOnInit(): void {
    this.data = this.statisticsService.getData();
    this.allRightAnswers = this.statisticsService.getAllRightAnswers();
  }

  redirectToLink(link: string) {
    this.router.navigateByUrl(link);
  }
}
