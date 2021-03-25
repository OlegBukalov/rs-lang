import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WordsApiService } from './core/services/wordsApi.service';
import { FooterComponent } from './core/components/footer/footer.component';
import { HeaderComponent } from './core/components/header/header.component';

import { NotFoundComponent } from './features/not-found/not-found.component';
import { StatisticsModule } from './features/statistics/statistics.module';
import { HomeModule } from './features/home/home.module';
import { LoginModule } from './features/login/login.module';

@NgModule({
  declarations: [AppComponent, NotFoundComponent, HeaderComponent, FooterComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    StatisticsModule,
    LoginModule,
    HttpClientModule,
  ],
  providers: [WordsApiService],
  bootstrap: [AppComponent],
})
export class AppModule {}
