import { Component } from '@angular/core';

import { ITeamItem } from '../../../core/interfaces/iteam-item';

import { LIST_TEAM } from './data-team';

@Component({
  selector: 'app-home-team',
  templateUrl: './home-team.component.html',
  styleUrls: ['./home-team.component.scss']
})
export class HomeTeamComponent {
  teamList: ITeamItem[] = LIST_TEAM;
}
