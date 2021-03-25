import { Routes } from "@angular/router";
import { NotFoundComponent } from "../not-found/not-found.component";
import { TextBookGroupComponent } from "./text-book-group/text-book-group.component";
import { TextBookPageComponent } from "./text-book-page/text-book-page.component";
import { TextBookComponent } from "./text-book/text-book.component";

// const pageRoutes: Routes = [
//   {path: 'page/:pageId', component: TextBookPageComponent}
// ]

const sectionRoutes: Routes = [
  {path: 'group/:groupId/page/:pageId', component: TextBookGroupComponent}
]

export const textBookRoutes: Routes = [
  { path: '', component: TextBookComponent, children: sectionRoutes },
  { path: '**', component: NotFoundComponent },
];
