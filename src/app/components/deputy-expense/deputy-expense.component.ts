import { formatCurrency } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DeputyExpenseService } from 'src/app/context/deputy-expense.service';
import { Months, Years } from 'src/app/models/dates.models';
import { Expense } from 'src/app/models/expenses.models';
import { FormDataExpense } from 'src/app/models/formData.models';
import { getYears } from 'src/app/utils/date';
import { months } from 'src/app/utils/date';
import { formatExpenseQuery } from 'src/app/utils/string-formater';

interface Pagination {
  next: boolean;
  previous: boolean;
}

@Component({
  selector: 'app-deputy-expense',
  templateUrl: './deputy-expense.component.html',
  styleUrls: [
    './deputy-expense.component.css',
    '../form-search/form-search.component.css',
  ],
})
export class DeputyExpenseComponent implements OnInit {
  public deputyExpense: Expense[] = [];
  public deputyId: number = 0;
  public pagination: Pagination = {} as Pagination;
  public selectYears: Years[] = getYears();
  public selectMonths: Months[] = months;
  public form: FormGroup;
  public lastExpense: Expense = {} as Expense;
  public specificExpense: Expense[] = [];
  public mostCostExpense: Expense = {} as Expense;

  constructor(
    private deputyExpenseService: DeputyExpenseService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.deputyExpenseService
      .getData()
      .subscribe((data) => (this.deputyExpense = data));
    this.form = this.fb.group({
      ano: [''],
      mes: [''],
      ordem: [''],
      valor: [''],
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.deputyId = params['id'];
    });
    this.fetchExpenses();
  }

  onSubmit() {
    const data: FormDataExpense = {
      ano: this.form.value.ano,
      mes: this.form.value.mes,
      valor: this.form.value.valor,
      ordem: this.form.value.ordem,
    };
    const query = formatExpenseQuery(data);
    if (!!query) {
      this.deputyExpenseService.getExpenses(
        `https://dadosabertos.camara.leg.br/api/v2/deputados/${this.deputyId}/despesas?itens=10&${query}`
      );
    }
  }

  private async fetchExpenses() {
    await this.deputyExpenseService.getExpenses(
      `https://dadosabertos.camara.leg.br/api/v2/deputados/${this.deputyId}/despesas?itens=10&ordenarPor=mes&ordem=desc`
    );
    this.specificExpense = await this.deputyExpenseService.getSpecificExpense(
      `https://dadosabertos.camara.leg.br/api/v2/deputados/${this.deputyId}/despesas?ordenarPor=mes&ordem=desc&itens=100`
    );
    this.mostCostExpense = this.getMostCostlyExpense();
    this.lastExpense = this.getLastExpense();
    this.pagination = this.deputyExpenseService.pagination;
    console.log(!!this.lastExpense);
  }

  async nextPage() {
    const next = this.deputyExpenseService.links.filter(
      (link) => link.rel === 'next'
    );
    await this.deputyExpenseService.getExpenses(next[0].href);
  }

  async previousPage() {
    const previous = this.deputyExpenseService.links.filter(
      (link) => link.rel === 'previous'
    );

    await this.deputyExpenseService.getExpenses(previous[0].href);
  }

  getMostCostlyExpense() {
    const mostCost = Math.max(
      ...this.specificExpense.map((expense) => expense.valorDocumento)
    );
    const expenseMostCost = this.specificExpense.filter(
      (expense) => expense.valorDocumento === mostCost
    );
    return expenseMostCost[0];
  }

  getLastExpense() {
    return this.specificExpense[0];
  }
}
