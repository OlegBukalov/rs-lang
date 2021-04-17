import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';

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
  private subscriptionCountWords: Subscription;
  data: IItemListGames[] = [];
  countAllUserWords = 0;
  allRightAnswersOfDay = 0;
  isLoading = false;
  isEmpty = false;

  constructor(
    private router: Router,
    private statisticsService: StatisticsService,
    private dictionaryService: DictionaryService,
    private toasterService: ToasterService,
  ) {}

  ngOnInit(): void {
    this.setStatisticsData();
    this.setCountAllUserWords();
  }

  setStatisticsData(): void {
    this.subscription = this.statisticsService.getDataFromServer().subscribe(
      (data) => {
        const dataDay = this.statisticsService.getUserStatistics(data.optional);
        this.data = dataDay.dataGames.dataGameItems;
        this.allRightAnswersOfDay = dataDay.dataGames.percentAllRightAnswers;
      },
      () => {
        this.data = [];
      },
    );
  }

  setCountAllUserWords(): void {
    this.isLoading = true;
    this.subscriptionCountWords = this.dictionaryService
      .getAggregatedWords(null, null, DictionaryCategory.Studied)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        }),
      )
      .subscribe(
        (data) => {
          const [item] = data;
          const itemCount = item.totalCount;
          const [countWord] = itemCount;
          this.countAllUserWords = countWord ? countWord.count : 0;
          this.setTemplate();
        },
        () => {
          this.toasterService.showError(
            'Не удалось загрузить данные об изученных словах',
            'Ошибка!',
          );
        },
      );
  }

  // TO DO все слова из игр будут попадать в изученные, так что достаточно этой проверки
  setTemplate(): void {
    this.isEmpty = this.countAllUserWords === 0;
  }

  redirectToLink(link: string): void {
    this.router.navigateByUrl(link);
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
    if (this.subscriptionCountWords) this.subscriptionCountWords.unsubscribe();
  }
}
