import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TextBookSettingsComponent } from './text-book-settings.component';
import { settingsRoutes } from './settings-routes';

@NgModule({
  declarations: [TextBookSettingsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    RouterModule.forChild(settingsRoutes),
  ],
})
export class SettingsModule {}
