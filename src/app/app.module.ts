import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { HeaderComponent } from './core/components/header/header.component';

import { NotFoundComponent } from './features/not-found/not-found.component';
import { StatisticsModule } from './features/statistics/statistics.module';
import { HomeModule } from './features/home/home.module';
import { LoginModule } from './features/login/login.module';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [AppComponent, NotFoundComponent, HeaderComponent, FooterComponent],
  imports: [
    BrowserModule,
    ToastrModule.forRoot(),
    AppRoutingModule,
    HomeModule,
    StatisticsModule,
    HttpClientModule,
    LoginModule,
    MaterialModule,
    BrowserAnimationsModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
