import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeDescriptionComponent } from './home-description/home-description.component';
import { HomeAdvantagesComponent } from './home-advantages/home-advantages.component';

@NgModule({
  declarations: [
    HomeComponent,
    HomeDescriptionComponent,
    HomeAdvantagesComponent
  ],
  imports: [CommonModule],
})
export class HomeModule {}
