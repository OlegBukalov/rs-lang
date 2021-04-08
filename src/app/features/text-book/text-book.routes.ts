import { Routes } from '@angular/router';
import { NotFoundComponent } from '../not-found/not-found.component';
import { CardPopupComponent } from './card-popup/card-popup.component';
import { TextBookComponent } from './text-book/text-book.component';

const cardRoutes: Routes = [{ path: 'card/:cardId', component: CardPopupComponent }];

export const textBookRoutes: Routes = [
  {
    path: 'group/:groupId/page/:pageId',
    component: TextBookComponent,
    children: cardRoutes,
  },
  { path: '**', component: NotFoundComponent },
];
