import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControlName } from './constants';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  signupForm: FormGroup;

  loginForm: FormGroup;

  formControlName = FormControlName;

  isFormSubmitted = false;

  isHidePassword = true;

  onSignup(): void {
    this.isFormSubmitted = true;
    if (!this.signupForm.valid) {
      // TODO: Implement logic of making signup request
    }
  }

  onLogin(): void {
    this.isFormSubmitted = true;
    if (!this.loginForm.valid) {
      // TODO: Implement logic of making login request
    }
  }

  isShowErrors(): boolean {
    return Boolean(
      (this.isFormSubmitted || this.loginForm.controls[this.formControlName.Name].touched) &&
        this.loginForm.controls[this.formControlName.Name].errors,
    );
  }
}
