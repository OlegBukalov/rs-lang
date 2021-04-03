import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotFoundComponent } from './features/not-found/not-found.component';
import { StatisticsComponent } from './features/statistics/statistics.component';
import { HomeComponent } from './features/home/home.component';
import { AuthComponent } from './features/auth/auth.component';
import { AuthGuard } from './features/auth/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'dictionary',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./features/dictionary/dictionary.module').then((m) => m.DictionaryModule),
  },
  {
    path: 'text-book',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./features/text-book/text-book.module').then((m) => m.TextBookModule),
  },
  {
    path: 'games',
    canActivate: [AuthGuard],
    loadChildren: () => import('./features/games/games.module').then((m) => m.GamesModule),
  },
  { path: 'statistics', component: StatisticsComponent, canActivate: [AuthGuard] },
  { path: 'auth', component: AuthComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
