import { DEFAULT_CURRENCY_CODE, NgModule } from '@angular/core';
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
import { LOCALE_ID } from '@angular/core';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localePt, 'pt-BR');

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
  providers: [
    DeputiesService,
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    {
      provide: DEFAULT_CURRENCY_CODE,
      useValue: '',
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
