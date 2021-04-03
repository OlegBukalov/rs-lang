import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { LoginResponse } from './constants';

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

  baseUrl = 'https://afternoon-falls-25894.herokuapp.com/';

  tokenExpirationTime: number;

  subscription: Subscription;

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

  refreshToken() {
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

  setupTokenResreshTimeout() {
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
