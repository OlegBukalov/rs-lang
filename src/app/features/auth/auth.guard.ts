import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { ToasterService } from 'src/app/core/services/toaster.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private toastrService: ToasterService) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    }
    this.toastrService.showWarning('Требуется авторизация', 'Доступ запрещён!');
    return false;
  }
}
