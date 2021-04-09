import { Component } from '@angular/core';
import { AuthPath } from 'src/app/features/auth/auth.constants';
import { AuthService } from 'src/app/features/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  authPath = AuthPath;

  constructor(public authService: AuthService) {}

  onLogout(): void {
    this.authService.logout();
  }
}
