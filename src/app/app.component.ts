import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './features/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'rs-lang';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (localStorage.loginData) {
      this.authService.loginData = JSON.parse(localStorage.loginData);
      this.authService.setupTokenRefreshTimeout();
    }
  }

  checkIsGameOpened(): boolean {
    return this.router.url.includes('games/');
  }
}
