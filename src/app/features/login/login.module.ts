import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    MaterialModule,
    BrowserAnimationsModule,
  ],
  exports: [LoginComponent],
})
export class LoginModule {}
