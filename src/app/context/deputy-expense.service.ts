import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable, Subject } from 'rxjs';
import { Links } from '../models/deputies.models';
import { Expense } from '../models/expenses.models';

@Injectable({
  providedIn: 'root',
})
export class DeputyExpenseService {
  public deputyExpenseData: Subject<Expense[]> = new Subject();
  public links: Links[] = [];
  public pagination = {
    next: true,
    previous: false,
  };
  public specificExpense: Expense[] = [];

  constructor() {}

  setData(newValue: Expense[]) {
    this.deputyExpenseData.next(newValue);
  }

  getData(): Observable<Expense[]> {
    return this.deputyExpenseData.asObservable();
  }

  async getExpenses(path: string) {
    const data = await axios
      .get(path)
      .then((response) => {
        this.setData(response.data.dados);
        this.links = response.data.links;
      })
      .catch((err) => console.log(err));
    this.hasPages();
  }

  private hasPages() {
    this.pagination.next = !!this.links.filter((link) => link.rel === 'next')
      .length;
    this.pagination.previous = !!this.links.filter(
      (link) => link.rel === 'previous'
    ).length;
  }

  async getSpecificExpense(path: string) {
    const data = await axios
      .get(path)
      .then((response) => response.data.dados)
      .catch((err) => console.log(err));
    return data;
  }
}
