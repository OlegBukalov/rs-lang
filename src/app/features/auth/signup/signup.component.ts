import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ToasterService } from 'src/app/core/services/toaster.service';
import { AuthService } from '../auth.service';
import {
  FormControlName,
  MAX_NAME_LENGTH,
  MAX_PASSWORD_LENGTH,
  MIN_NAME_LENGTH,
  MIN_PASSWORD_LENGTH,
} from '../constants';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit, OnDestroy {
  signupForm: FormGroup;

  formControlName = FormControlName;

  isFormSubmitted = false;

  isHidePassword = true;

  subscription: Subscription;

  constructor(private authService: AuthService, private toastrService: ToasterService) {}

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
      },
      (error) => {
        this.handleSignupErrors(error);
      },
    );
  }

  handleSignupErrors(err) {
    if (err.status === 422 || err.status === 404) {
      err.error.error.errors.forEach((error) => {
        const errorName = error.path[0];
        if (errorName === 'name') {
          this.toastrService.showError('Неверное имя', 'Ошибка');
        } else if (errorName === 'email') {
          this.toastrService.showError('Неверная почта', 'Ошибка');
        } else if (errorName === 'password') {
          this.toastrService.showError(
            'Неверный пароль. Ваш пароль должен содержать по крайней мере 8 символов, одну прописную, одну строчную букву и специальный символ',
            'Ошибка',
          );
        }
      });
    } else {
      this.toastrService.showError('Имя, почта или пароль не соответствуют формату', 'Ошибка');
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
