import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthComponent } from './auth.component';
import { AuthPath } from './auth.constants';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

export const routes: Routes = [
  {
    path: AuthPath.Auth,
    component: AuthComponent,
    children: [
      {
        path: '',
        redirectTo: `/${AuthPath.Auth}/${AuthPath.Login}`,
        pathMatch: 'full',
      },
      {
        path: `${AuthPath.Login}`,
        component: LoginComponent,
      },
      {
        path: `${AuthPath.Signup}`,
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
