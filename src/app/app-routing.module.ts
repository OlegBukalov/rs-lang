import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotFoundComponent } from './features/not-found/not-found.component';
import { StatisticsComponent } from './features/statistics/statistics.component';
import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/login/login.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'dictionary',
    loadChildren: () =>
      import('./features/dictionary/dictionary.module').then((m) => m.DictionaryModule),
  },
  {
    path: 'text-book',
    loadChildren: () =>
      import('./features/text-book/text-book.module').then((m) => m.TextBookModule),
  },
  {
    path: 'games',
    loadChildren: () => import('./features/games/games.module').then((m) => m.GamesModule),
  },
  { path: 'statistics', component: StatisticsComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
