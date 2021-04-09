import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthPath } from './auth.constants';
import { AuthService } from './auth.service';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit, OnDestroy {
  activeLink: AuthPath;

  authPath = AuthPath;

  subscription: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.activeLink.next(AuthPath.Login);
    this.subscription = this.authService.activeLink.subscribe((link: AuthPath) => {
      this.activeLink = link;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.authService.activeLink.complete();
  }
}
