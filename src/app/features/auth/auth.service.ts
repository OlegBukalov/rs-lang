import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { Observable, Subject, Subscription } from 'rxjs';
import { LoginResponse, TokenPayload } from './login-response.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  loginData: LoginResponse = {
    message: '',
    token: '',
    refreshToken: '',
    userId: '',
    name: '',
  };

  activeLink: Subject<string> = new Subject();

  private readonly baseUrl = 'https://afternoon-falls-25894.herokuapp.com/';

  private tokenExpirationTime: number;

  private subscription: Subscription;

  private tokenRefreshTimeout: any;

  constructor(private http: HttpClient) {}

  login(loginForm: FormGroup): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}signin`, loginForm.value).pipe(
      tap((value: LoginResponse) => {
        this.loginData = value;
        localStorage.loginData = JSON.stringify(this.loginData);
        this.setupTokenRefreshTimeout();
        return value;
      }),
    );
  }

  signup(loginForm: FormGroup): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}users`, loginForm.value);
  }

  private refreshToken() {
    const options = {
      headers: {
        Authorization: `Bearer ${this.loginData.refreshToken}`,
        Accept: 'application/json',
      },
    };
    return new Promise((resolve, reject) => {
      this.subscription = this.http
        .get<LoginResponse>(`${this.baseUrl}users/${this.loginData.userId}/tokens`, options)
        .subscribe(
          (response: LoginResponse) => {
            this.loginData.token = response.token;
            this.loginData.refreshToken = response.refreshToken;
            localStorage.loginData = JSON.stringify(this.loginData);
            this.setupTokenRefreshTimeout();
            resolve(true);
          },
          (error) => {
            reject(error);
          },
        );
    });
  }

  setupTokenRefreshTimeout() {
    if (this.loginData.token) {
      this.tokenExpirationTime = this.getTokenPayload(this.loginData.token).exp;
      const iatTime = this.getTokenPayload(this.loginData.token).iat;
      const timeoutTime = (this.tokenExpirationTime - iatTime) * 1000;
      this.tokenRefreshTimeout = setTimeout(() => {
        const tokenLifeTimeLeft = this.tokenExpirationTime * 1000 - Date.now();
        if (tokenLifeTimeLeft <= 0) {
          this.refreshToken();
        } else {
          this.tokenRefreshTimeout = setTimeout(() => {
            this.refreshToken();
          }, tokenLifeTimeLeft);
        }
      }, timeoutTime);
    }
  }

  isLoggedIn(): boolean {
    return this.tokenExpirationTime && this.tokenExpirationTime * 1000 - Date.now() > 0;
  }

  private getTokenPayload(token: string): TokenPayload {
    return JSON.parse(atob(token.split('.')[1]));
  }

  logout(): void {
    clearTimeout(this.tokenRefreshTimeout);
    localStorage.loginData = null;
    this.tokenExpirationTime = null;
    this.loginData = null;
  }

  ngOnDestroy(): void {
    clearTimeout(this.tokenRefreshTimeout);
    this.subscription.unsubscribe();
  }
}
