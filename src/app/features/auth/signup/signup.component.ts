import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ToasterService } from 'src/app/core/services/toaster.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import {
  AuthPath,
  FormControlName,
  MAX_NAME_LENGTH,
  MAX_PASSWORD_LENGTH,
  MIN_NAME_LENGTH,
  MIN_PASSWORD_LENGTH,
} from '../auth.constants';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit, OnDestroy {
  @Output() signup: EventEmitter<void> = new EventEmitter();

  signupForm: FormGroup;

  formControlName = FormControlName;

  isFormSubmitted = false;

  isHidePassword = true;

  subscription: Subscription;

  constructor(
    private authService: AuthService,
    private toastrService: ToasterService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(MAX_NAME_LENGTH),
        Validators.minLength(MIN_NAME_LENGTH),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.maxLength(MAX_PASSWORD_LENGTH),
        Validators.minLength(MIN_PASSWORD_LENGTH),
      ]),
    });
  }

  onSignup(): void {
    this.isFormSubmitted = true;
    if (!this.signupForm.valid) {
      this.toastrService.showError('Неверно заполнена форма регистрации', 'Ошибка');
      return;
    }
    this.subscription = this.authService.signup(this.signupForm).subscribe(
      () => {
        this.toastrService.showSuccess('Регистрация прошла успешно!', 'Успех');
        this.authService.activeLink.next(AuthPath.Login);
        this.router.navigate([AuthPath.Auth, AuthPath.Login]);
      },
      (error) => {
        this.handleSignupErrors(error);
      },
    );
  }

  handleSignupErrors(err: HttpErrorResponse) {
    if (err.status === 422 || err.status === 404) {
      err.error.error.errors.forEach((error) => {
        const errorName = error.path[0];
        switch (errorName) {
          case 'name':
            this.toastrService.showError('Неверное имя', 'Ошибка');
            break;
          case 'email':
            this.toastrService.showError('Неверная почта', 'Ошибка');
            break;
          case 'password':
            this.toastrService.showError(
              'Неверный пароль. Ваш пароль должен содержать по крайней мере 8 символов, одну прописную, одну строчную букву и специальный символ',
              'Ошибка',
            );
            break;
          default:
            this.toastrService.showError(
              'Имя, почта или пароль не соответствуют формату',
              'Ошибка',
            );
        }
      });
    }
  }

  isShowErrors(formControlName: FormControlName): boolean {
    return Boolean(
      (this.isFormSubmitted || this.signupForm.controls[formControlName].touched) &&
        this.signupForm.controls[formControlName].errors,
    );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
