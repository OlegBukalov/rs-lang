import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!request.headers.has('Authorization')) {
      const newRequest = request.clone({
        headers: request.headers
          .append('Authorization', `Bearer ${this.authService.loginData.token}`)
          .append('Accept', 'application/json'),
      });
      return next.handle(newRequest);
    }
    return next.handle(request);
  }
}
