import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeDescriptionComponent } from './home-description/home-description.component';
import { HomeAdvantagesComponent } from './home-advantages/home-advantages.component';
import { HomeTeamComponent } from './home-team/home-team.component';

@NgModule({
  declarations: [
    HomeComponent,
    HomeDescriptionComponent,
    HomeAdvantagesComponent,
    HomeTeamComponent,
  ],
  imports: [CommonModule],
})
export class HomeModule {}
