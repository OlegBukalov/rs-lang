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
@NgModule({
  declarations: [AppComponent, NotFoundComponent, HeaderComponent, FooterComponent],
  imports: [BrowserModule, AppRoutingModule, HomeModule, StatisticsModule, LoginModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
