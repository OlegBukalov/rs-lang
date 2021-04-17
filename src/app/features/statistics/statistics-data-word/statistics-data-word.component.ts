import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-statistics-data-word',
  templateUrl: './statistics-data-word.component.html',
  styleUrls: ['./statistics-data-word.component.scss'],
})
export class StatisticsDataWordComponent {
  @Input() countAllUserWords = 0;
}
