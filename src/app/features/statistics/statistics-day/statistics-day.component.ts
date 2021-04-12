import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { StatisticsService } from '../statistics.service';

import { IItemListGames } from '../interfaces/iitem-list-games';

@Component({
  selector: 'app-statistics-day',
  templateUrl: './statistics-day.component.html',
  styleUrls: ['./statistics-day.component.scss'],
})
export class StatisticsDayComponent implements OnInit {
  data: IItemListGames[];
  countAllUserWords: number;
  allRightAnswersOfDay: number;
  isLoading = true;

  isEmpty = true;
  // TODO будет меняться в зависимости от наличия данных по обучению для отображения альтернативного контента

  constructor(private router: Router, private statisticsService: StatisticsService) {}

  ngOnInit(): void {
    this.data = this.statisticsService.getData();
    this.allRightAnswersOfDay = this.statisticsService.getAllRightAnswers();

    this.countAllUserWords = this.statisticsService.getAllUserWords();

    this.updateData();
  }

  redirectToLink(link: string) {
    this.router.navigateByUrl(link);
  }

  // getAllUserWords(): number {
  //   this.isLoading = true;
  //   let countAllWords: any;
  //   this.dictionaryService.getAggregatedWords(DictionaryCategory.Studied).subscribe((result) => {
  //     const data = result;
  //     this.isLoading = false;
  //     let allUserData: any;
  //     [allUserData] = data;
  //
  //     console.log(allUserData);
  //     [countAllWords] = allUserData.totalCount;
  //     console.log(countAllWords.count);
  //
  //   });
  //
  //   // this.countAllUserWords = countAllWords.count;
  //   return countAllWords.count;
  // }

  updateData() {
    // this.dictionarySevice.getAggregatedWords(this.currentCategory).subscribe((result) => {
    //   this.wordPages = result;
    // });
  }
}
