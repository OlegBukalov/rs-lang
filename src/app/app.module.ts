import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './features/home/home.component';
import { StatisticsComponent } from './features/statistics/statistics.component';
import { NotFoundComponent } from './features/not-found/not-found.component';
import { LoginComponent } from './features/login/login.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { HeaderComponent } from './core/components/header/header.component';
import { GamesModule } from './features/games/games.module';
import { DictionaryModule } from './features/dictionary/dictionary.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StatisticsComponent,
    NotFoundComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, GamesModule, DictionaryModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
