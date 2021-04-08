import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TextBookComponent } from './text-book/text-book.component';
import { TextBookGroupComponent } from './text-book-group/text-book-group.component';
import { TextBookPageComponent } from './text-book-page/text-book-page.component';
import { textBookRoutes } from './text-book.routes';
import { TextBookCardComponent } from './text-book-card/text-book-card.component';
import { CardPopupComponent } from './card-popup/card-popup.component';
import { PaginationComponent } from './pagination/pagination.component';
import { TextBookSettingsComponent } from './text-book-settings/text-book-settings.component';

@NgModule({
  declarations: [
    TextBookComponent,
    TextBookGroupComponent,
    TextBookPageComponent,
    TextBookCardComponent,
    TextBookSettingsComponent,
    CardPopupComponent,
    PaginationComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(textBookRoutes),
    MatProgressSpinnerModule,
    MatSlideToggleModule,
  ],
  providers: [HttpClient],
})
export class TextBookModule {}
