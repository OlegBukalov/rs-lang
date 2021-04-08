import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToasterService } from 'src/app/core/services/toaster.service';
import { AuthService } from '../auth.service';
import { FormControlName, MAX_PASSWORD_LENGTH, MIN_PASSWORD_LENGTH } from '../auth.constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;

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
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.maxLength(MAX_PASSWORD_LENGTH),
        Validators.minLength(MIN_PASSWORD_LENGTH),
      ]),
    });
  }

  onLogin(): void {
    this.isFormSubmitted = true;
    if (!this.loginForm.valid) {
      this.toastrService.showError('Неверно заполнена форма входа', 'Ошибка');
      return;
    }
    this.subscription = this.authService.login(this.loginForm).subscribe(
      () => {
        this.toastrService.showSuccess('Авторизация успешна', 'Успех');
        this.router.navigate(['']);
      },
      (error) => {
        if (error.status === 403 || error.status === 404) {
          this.toastrService.showError('Неверная почта или пароль', 'Ошибка');
        } else {
          this.toastrService.showError(error, 'Ошибка');
        }
      },
    );
  }

  isShowErrors(formControlName: FormControlName): boolean {
    return Boolean(
      (this.isFormSubmitted || this.loginForm.controls[formControlName].touched) &&
        this.loginForm.controls[formControlName].errors,
    );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
