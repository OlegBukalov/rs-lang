import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './features/home/home.component';
import { AuthGuard } from './features/auth/auth.guard';
import { AuthRoutingModule } from './features/auth/auth-routing.module';

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
    loadChildren: () =>
      import('./features/text-book/text-book.module').then((m) => m.TextBookModule),
  },
  {
    path: 'games',
    loadChildren: () => import('./features/games/games.module').then((m) => m.GamesModule),
  },
  {
    path: 'statistics',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./features/statistics/statistics.module').then((m) => m.StatisticsModule),
  },
  {
    path: '**',
    loadChildren: () =>
      import('./features/not-found/not-found.module').then((m) => m.NotFoundModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), AuthRoutingModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
