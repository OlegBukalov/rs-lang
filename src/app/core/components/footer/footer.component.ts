import { Component } from '@angular/core';

import { ITeamItem } from '../../interfaces/iteam-item';

import { LIST_TEAM } from '../../../features/home/home-team/data-team';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  teamList: ITeamItem[] = LIST_TEAM;
}
