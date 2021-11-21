import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable, Subject } from 'rxjs';
import { Links } from '../models/deputies.models';
import { Propositions } from '../models/propositions';

@Injectable({
  providedIn: 'root',
})
export class PropositionsService {
  public deputyExpenseData: Subject<Propositions[]> = new Subject();
  public links: Links[] = [];
  public pagination = {
    next: true,
    previous: false,
  };

  constructor() {}

  setData(newValue: Propositions[]) {
    this.deputyExpenseData.next(newValue);
  }

  getData(): Observable<Propositions[]> {
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
}
