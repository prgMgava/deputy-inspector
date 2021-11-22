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
import { PropositionsComponent } from './components/propositions/propositions.component';
import { PropositionComponent } from './views/proposition/proposition.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

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
    PropositionsComponent,
    PropositionComponent,
  ],

  imports: [
    AppRoutingModule,
    NoopAnimationsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatMenuModule,
  ],
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
