import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './shared/header/header.component';
import { FormSearchComponent } from './shared/form-search/form-search.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DeputyCardsComponent } from './shared/deputy-cards/deputy-cards.component';
import { DeputiesService } from './context/deputies.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FormSearchComponent,
    DeputyCardsComponent,
  ],
  imports: [AppRoutingModule, NoopAnimationsModule, ReactiveFormsModule],
  providers: [DeputiesService],
  bootstrap: [AppComponent],
})
export class AppModule {}
