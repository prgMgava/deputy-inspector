import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { FormSearchComponent } from './components/form-search/form-search.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DeputyCardsComponent } from './components/deputy-cards/deputy-cards.component';
import { DeputiesService } from './context/deputies.service';
import { DeputyComponent } from './views/deputy/deputy.component';
import { DeputyExpenseComponent } from './components/deputy-expense/deputy-expense.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FormSearchComponent,
    DeputyCardsComponent,
    DeputyComponent,
    DeputyExpenseComponent,
  ],
  imports: [AppRoutingModule, NoopAnimationsModule, ReactiveFormsModule],
  providers: [DeputiesService],
  bootstrap: [AppComponent],
})
export class AppModule {}
