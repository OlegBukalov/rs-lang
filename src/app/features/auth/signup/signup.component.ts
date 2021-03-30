import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
export class SignupComponent implements OnInit {
  signupForm: FormGroup;

  formControlName = FormControlName;

  isFormSubmitted = false;

  isHidePassword = true;

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
      // TODO: Implement logic of making signup request
    }
  }

  isShowErrors(formControlName: FormControlName): boolean {
    return Boolean(
      (this.isFormSubmitted || this.signupForm.controls[formControlName].touched) &&
        this.signupForm.controls[formControlName].errors,
    );
  }
}
