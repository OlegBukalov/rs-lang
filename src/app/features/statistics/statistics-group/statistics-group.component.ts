import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-statistics-group',
  templateUrl: './statistics-group.component.html',
  styleUrls: ['./statistics-group.component.scss'],
})
export class StatisticsGroupComponent {
  constructor(private router: Router) {}
}
