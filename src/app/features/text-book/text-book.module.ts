import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TextBookComponent } from './text-book/text-book.component';
import { TextBookGroupComponent } from './text-book-group/text-book-group.component';
import { TextBookPageComponent } from './text-book-page/text-book-page.component';
import { textBookRoutes } from './text-book.routes';
import { TextBookCardComponent } from './text-book-card/text-book-card.component';
import { CardPopupComponent } from './card-popup/card-popup.component';
import { PaginationComponent } from './pagination/pagination.component';
import { SharedModule } from 'src/app/core/shared/shared.module';

@NgModule({
  declarations: [
    TextBookComponent,
    TextBookGroupComponent,
    TextBookPageComponent,
    TextBookCardComponent,
    CardPopupComponent,
    PaginationComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(textBookRoutes), MatProgressSpinnerModule, SharedModule],
  providers: [HttpClient],
})
export class TextBookModule {}
