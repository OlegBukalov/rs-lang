import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormControlName, MAX_PASSWORD_LENGTH, MIN_PASSWORD_LENGTH } from '../constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  formControlName = FormControlName;

  isFormSubmitted = false;

  isHidePassword = true;

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
      // TODO: Implement logic of making login request
    }
  }

  isShowErrors(formControlName: FormControlName): boolean {
    return Boolean(
      (this.isFormSubmitted || this.loginForm.controls[formControlName].touched) &&
        this.loginForm.controls[formControlName].errors,
    );
  }
}
