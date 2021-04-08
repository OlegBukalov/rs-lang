import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthComponent } from './auth.component';
import { BASIC_ROUTE, CHILD_ROUTE_LINKS } from './auth.constants';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

export const routes: Routes = [
  {
    path: BASIC_ROUTE,
    component: AuthComponent,
    children: [
      {
        path: '',
        redirectTo: `/${BASIC_ROUTE}/${CHILD_ROUTE_LINKS[0]}`,
        pathMatch: 'full',
      },
      {
        path: `${CHILD_ROUTE_LINKS[0]}`,
        component: LoginComponent,
      },
      {
        path: `${CHILD_ROUTE_LINKS[1]}`,
        component: SignupComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
