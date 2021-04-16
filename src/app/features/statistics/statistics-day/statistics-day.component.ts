import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { DictionaryCategory } from 'src/app/features/dictionary/dictionary-category';
import { ToasterService } from 'src/app/core/services/toaster.service';
import { DictionaryService } from '../../../core/services/dictionary.service';
import { StatisticsService } from '../statistics.service';

import { IItemListGames } from '../interfaces/iitem-list-games';

@Component({
  selector: 'app-statistics-day',
  templateUrl: './statistics-day.component.html',
  styleUrls: ['./statistics-day.component.scss'],
})
export class StatisticsDayComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  data: IItemListGames[];
  countAllUserWords: number;
  allRightAnswersOfDay: number;
  isLoading: boolean;
  isEmpty: boolean;

  constructor(
    private router: Router,
    private statisticsService: StatisticsService,
    private dictionaryService: DictionaryService,
    private toasterService: ToasterService,
  ) {}

  ngOnInit(): void {
    this.getStatisticsData();
    this.getCountAllUserWords();
  }

  getStatisticsData(): void {
    this.subscription = this.statisticsService.getDataFromServer().subscribe(
      (data) => {
        const dataDay = this.statisticsService.setUserStatistics(data.optional);
        this.data = dataDay.dataGames.dataGameItems;
        this.allRightAnswersOfDay = dataDay.dataGames.percentAllRightAnswers;
      },
      () => {
        this.data = [];
      },
    );
  }

  getCountAllUserWords(): void {
    this.isLoading = false;
    const result = this.dictionaryService.getAggregatedWords(DictionaryCategory.Studied);
    result.subscribe(
      (data) => {
        const [item] = data;
        const itemCount = item.totalCount;
        const [countWord] = itemCount;
        this.isLoading = true;
        if (countWord) {
          this.countAllUserWords = countWord.count;
        } else this.countAllUserWords = 0;
        this.checkTemplate();
      },
      () => {
        this.toasterService.showError('Не удалось загрузить данные об изученных словах', 'Ошибка!');
      },
    );
  }

  checkTemplate() {
    if (this.data && this.countAllUserWords === 0) {
      this.isEmpty = true;
    } else this.isEmpty = false;
  }

  redirectToLink(link: string) {
    this.router.navigateByUrl(link);
  }

  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
