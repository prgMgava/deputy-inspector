import { Component, OnInit } from '@angular/core';
import { DeputiesService } from 'src/app/context/deputies.service';
import { Deputies } from 'src/app/models/deputies.models';
import { State } from 'src/app/models/stateModels';
import { states } from 'src/app/utils/states';

interface Pagination {
  next: boolean;
  previous: boolean;
}
@Component({
  selector: 'app-deputy-cards',
  templateUrl: './deputy-cards.component.html',
  styleUrls: ['./deputy-cards.component.css'],
})
export class DeputyCardsComponent implements OnInit {
  public states: State[] = states;

  public deputies: Deputies[] = [];
  public pagination: Pagination = {} as Pagination;

  constructor(private deputiesService: DeputiesService) {
    this.deputiesService
      .getDeputiesData()
      .subscribe((data) => (this.deputies = data));
  }

  ngOnInit() {
    this.fetchDeputies();
  }

  private async fetchDeputies() {
    await this.deputiesService.getTenDeputies(
      'https://dadosabertos.camara.leg.br/api/v2/deputados?itens=10'
    );
    this.pagination = this.deputiesService.pagination;
    console.log(this.deputies);
  }

  async nextPage() {
    const next = this.deputiesService.links.filter(
      (link) => link.rel === 'next'
    );
    await this.deputiesService.getTenDeputies(next[0].href);
  }

  async previousPage() {
    const previous = this.deputiesService.links.filter(
      (link) => link.rel === 'previous'
    );

    await this.deputiesService.getTenDeputies(previous[0].href);
  }
}

// TODO: transformar siglas para nome extenso
