import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-statistics-day',
  templateUrl: './statistics-day.component.html',
  styleUrls: ['./statistics-day.component.scss'],
})
export class StatisticsDayComponent {
  data: number[] = [];
  // TODO объект с данными для отображения, будет заменен на другой тип, пока только для теста

  constructor(private router: Router) {}

  redirectToLink(link: string) {
    this.router.navigateByUrl(link);
  }
}
