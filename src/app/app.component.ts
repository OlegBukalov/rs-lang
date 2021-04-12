import { Component, OnInit } from '@angular/core';
import { AuthService } from './features/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'rs-lang';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    if (localStorage.loginData) {
      this.authService.loginData = JSON.parse(localStorage.loginData);
      this.authService.setupTokenRefreshTimeout();
    }
  }
}
