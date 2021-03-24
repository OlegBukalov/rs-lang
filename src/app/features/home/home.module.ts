import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeDescriptionComponent } from './home-description/home-description.component';

@NgModule({
  declarations: [HomeComponent, HomeDescriptionComponent],
  imports: [CommonModule],
})
export class HomeModule {}
