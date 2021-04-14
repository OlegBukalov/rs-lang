import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginResponse } from './login-response.interface';

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

  isLogout = false;

  get token() {
    // const token = localStorage.getItem('token');
    // if (token) return token;

    // localStorage.setItem('token', this.loginData.token);
    return this.loginData.token;
  }

  // Для тестирования раскомментировать три строки
  // в геттерах token и userId
  // и закомментировать поля canActivate в app-routing.module
  // тогда не нужно будет заново авторизоваться после каждой перезагрузки

  get userId() {
    // const id = localStorage.getItem('userId');
    // if (id) return id;

    // localStorage.setItem('userId', this.loginData.userId);
    return this.loginData.userId;
  }

  private readonly baseUrl = `${environment.baseUrl}/`;

  private tokenExpirationTime: number;

  private subscription: Subscription;

  constructor(private http: HttpClient) {}

  login(loginForm: FormGroup): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}signin`, loginForm.value).pipe(
      tap((value: LoginResponse) => {
        this.loginData = value;
        this.setupTokenResreshTimeout();
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
            resolve(true);
          },
          (error) => {
            reject(error);
          },
        );
    });
  }

  private setupTokenResreshTimeout() {
    if (this.loginData.token) {
      const { token } = this.loginData;
      const payload = JSON.parse(atob(token.split('.')[1]));
      this.tokenExpirationTime = payload.exp;
      const iatTime = payload.iat;
      const timeoutTime = (this.tokenExpirationTime - iatTime) * 1000;
      setTimeout(() => {
        const tokenLifeTime = this.tokenExpirationTime * 1000 - Date.now();
        if (tokenLifeTime <= 0) {
          this.refreshToken();
        } else {
          setTimeout(() => {
            this.refreshToken();
          }, tokenLifeTime);
        }
      }, timeoutTime);
    }
  }

  isLoggedIn(): boolean {
    return this.tokenExpirationTime && this.tokenExpirationTime * 1000 - Date.now() > 0;
  }

  logout(): void {
    this.tokenExpirationTime = null;
    this.loginData = null;
    this.isLogout = true;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
