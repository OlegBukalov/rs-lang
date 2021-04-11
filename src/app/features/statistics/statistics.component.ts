import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth/auth.service';
import { StatisticsService } from './statistics.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent implements OnInit {
  URLStat: string;
  dataUser: any;

  constructor(public authService: AuthService, public statisticsService: StatisticsService) {}

  ngOnInit() {
    // const baseUrl = 'https://rs-lang-team-5.herokuapp.com';
    // const idUser = this.authService.loginData.userId;
    // this.URLStat = `${baseUrl}/users/${idUser}/statistics`;
    // console.log(this.authService.loginData);
    // console.log(this.URLStat);
    // this.statisticsService.getUserData().subscribe(data => this.dataUser = data);
    // console.log('data - ', this.dataUser);
    this.dataUser = 'data';
  }
}
