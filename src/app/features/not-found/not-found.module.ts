import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found.component';

@NgModule({
  declarations: [NotFoundComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: NotFoundComponent }]),
    MatIconModule,
  ],
  exports: [NotFoundComponent, RouterModule],
})
export class NotFoundModule {}
