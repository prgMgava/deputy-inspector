import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeputyExpenseService } from 'src/app/context/deputy-expense.service';
import { Expense } from 'src/app/models/expenses.models';

interface Pagination {
  next: boolean;
  previous: boolean;
}
@Component({
  selector: 'app-deputy-expense',
  templateUrl: './deputy-expense.component.html',
  styleUrls: ['./deputy-expense.component.css'],
})
export class DeputyExpenseComponent implements OnInit {
  public deputyExpense: Expense[] = [];
  public deputyId: number = 0;
  public pagination: Pagination = {} as Pagination;

  constructor(
    private deputyExpenseService: DeputyExpenseService,
    private route: ActivatedRoute
  ) {
    this.deputyExpenseService
      .getData()
      .subscribe((data) => (this.deputyExpense = data));
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.deputyId = params['id'];
    });
    this.fetchDeputies();
  }

  private async fetchDeputies() {
    await this.deputyExpenseService.getExpenses(
      `https://dadosabertos.camara.leg.br/api/v2/deputados/${this.deputyId}/despesas?itens=10&ordenarPor=mes&ordem=desc`
    );
    this.pagination = this.deputyExpenseService.pagination;
    console.log(this.pagination);
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
}
