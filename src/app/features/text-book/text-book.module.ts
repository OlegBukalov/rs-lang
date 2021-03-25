import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextBookComponent } from './text-book/text-book.component';
import { RouterModule } from '@angular/router';
import { textBookRoutes } from './text-book.routes';
import { TextBookGroupComponent } from './text-book-group/text-book-group.component';
import { TextBookPageComponent } from './text-book-page/text-book-page.component';
import { HttpClient, HttpHandler } from '@angular/common/http';

@NgModule({
  declarations: [TextBookComponent, TextBookGroupComponent, TextBookPageComponent],
  imports: [
    CommonModule, RouterModule.forChild(textBookRoutes),
  ],
  providers: [HttpClient]
})
export class TextBookModule { }
