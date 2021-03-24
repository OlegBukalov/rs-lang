import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './features/not-found/not-found.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { HeaderComponent } from './core/components/header/header.component';
import { StatisticsModule } from './features/statistics/statistics.module';
import { HomeModule } from './features/home/home.module';
import { LoginModule } from './features/login/login.module';
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
    HomeModule, 
    StatisticsModule, 
    LoginModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
