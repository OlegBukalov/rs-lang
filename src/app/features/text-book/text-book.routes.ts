import { Routes } from '@angular/router';
import { NotFoundComponent } from '../not-found/not-found.component';
import { CardPopupComponent } from './card-popup/card-popup.component';
import { TextBookGroupComponent } from './text-book-group/text-book-group.component';
import { TextBookComponent } from './text-book/text-book.component';

const cardRoutes: Routes = [{ path: 'card/:cardId', component: CardPopupComponent }];

const groupRoutes: Routes = [
  { path: 'group/:groupId/page/:pageId', component: TextBookGroupComponent, children: cardRoutes },
];

export const textBookRoutes: Routes = [
  { path: '', component: TextBookComponent, children: groupRoutes },
  { path: '**', component: NotFoundComponent },
];
