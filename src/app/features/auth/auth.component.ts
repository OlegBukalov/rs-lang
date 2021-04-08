import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CHILD_ROUTE_LINKS } from './auth.constants';
import { AuthService } from './auth.service';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit, OnDestroy {
  activeLink: string;

  links: string[] = [];

  subscription: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.links = CHILD_ROUTE_LINKS;
    this.authService.activeLink.next(this.links[0]);
    this.subscription = this.authService.activeLink.subscribe((link: string) => {
      this.activeLink = link;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.authService.activeLink.complete();
  }
}
