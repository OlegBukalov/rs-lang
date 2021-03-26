import { Routes } from "@angular/router";
import { NotFoundComponent } from "../not-found/not-found.component";
import { TextBookGroupComponent } from "./text-book-group/text-book-group.component";
import { TextBookComponent } from "./text-book/text-book.component";

const groupRoutes: Routes = [
  {path: 'group/:groupId/page/:pageId', component: TextBookGroupComponent}
]

export const textBookRoutes: Routes = [
  { path: '', component: TextBookComponent, children: groupRoutes },
  { path: '**', component: NotFoundComponent },
];
