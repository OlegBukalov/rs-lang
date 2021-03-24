import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
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
import { WordsApiService } from './core/services/wordsApi.service';
import { CardGameListComponent } from './features/card-game-list/card-game-list.component';
import { CardGameItemComponent } from './features/card-game-item/card-game-item.component';
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
    CardGameListComponent,
    CardGameItemComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [WordsApiService],
  bootstrap: [AppComponent],
})
export class AppModule {}
