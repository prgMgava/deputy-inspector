import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PropositionsComponent } from './components/propositions/propositions.component';
import { DeputyComponent } from './views/deputy/deputy.component';
import { HomeComponent } from './views/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'deputy/:id',
    component: DeputyComponent,
  },
  {
    path: 'proposition/:id',
    component: PropositionsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
