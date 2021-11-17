import { Component, OnInit } from '@angular/core';
import { DeputiesService } from 'src/app/context/deputies.service';
import { Deputy } from 'src/app/models/deputies.models';
import { State } from 'src/app/models/stateModels';
import { states } from 'src/app/utils/states';

@Component({
  selector: 'app-deputy-cards',
  templateUrl: './deputy-cards.component.html',
  styleUrls: ['./deputy-cards.component.css'],
})
export class DeputyCardsComponent implements OnInit {
  public deputies: Deputy[] = [];
  public states: State[] = states;
  public hasPrevious: boolean = false;
  public hasNext: boolean = true;

  constructor(private deputiesService: DeputiesService) {
    this.deputiesService
      .getDeputiesData()
      .subscribe((data) => (this.deputies = data));
  }

  ngOnInit(): void {
    // this.fetchDeputies();
  }

  private async fetchDeputies() {
    await this.deputiesService.getTenDeputies(
      'https://dadosabertos.camara.leg.br/api/v2/deputados?itens=10'
    );
  }

  async nextPage() {
    const next = this.deputiesService.links.filter(
      (link) => link.rel === 'next'
    );
    await this.deputiesService.getTenDeputies(next[0].href);
    this.hasPages();
  }

  async previousPage() {
    const next = this.deputiesService.links.filter(
      (link) => link.rel === 'previous'
    );
    console.log(this.deputiesService.links);

    await this.deputiesService.getTenDeputies(next[0].href);
    this.hasPages();
  }

  private hasPages() {
    console.log(this.deputiesService.links);
    this.hasNext = !!this.deputiesService.links.filter(
      (link) => link.rel === 'next'
    ).length;
    this.hasPrevious = !!this.deputiesService.links.filter(
      (link) => link.rel === 'previous'
    ).length;
    console.log(this.hasPrevious);
  }
}

// TODO: transformar siglas para nome extenso
