import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  signupForm: FormGroup;

  loginForm: FormGroup;

  formSubmitted = false;

  hidePassword = true;

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      userName: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    });
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    });
  }

  onSignup(): void {
    this.formSubmitted = true;
    // TODO: Implement logic of making signup request
  }

  onLogin(): void {
    this.formSubmitted = true;
    // TODO: Implement logic of making login request
  }
}
