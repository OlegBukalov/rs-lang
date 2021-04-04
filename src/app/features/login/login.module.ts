import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login.component';

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, ReactiveFormsModule, MaterialModule, BrowserAnimationsModule],
  exports: [LoginComponent],
})
export class LoginModule {}
