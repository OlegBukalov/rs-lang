import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './features/home/home.component';
import { DictionaryComponent } from './features/dictionary/dictionary.component';
import { GamesComponent } from './features/games/games.component';
import { StatisticsComponent } from './features/statistics/statistics.component';
import { NotFoundComponent } from './features/not-found/not-found.component';
import { LoginComponent } from './features/login/login.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { HeaderComponent } from './core/components/header/header.component';
import { GameListComponent } from './core/components/game-list/game-list.component';
import { GameItemComponent } from './core/components/game-item/game-item.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DictionaryComponent,
    GamesComponent,
    StatisticsComponent,
    NotFoundComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    GameListComponent,
    GameItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
