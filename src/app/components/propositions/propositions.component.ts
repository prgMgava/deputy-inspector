import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PropositionsService } from 'src/app/context/propositions.service';
import { Propositions } from 'src/app/models/propositions';

interface Pagination {
  next: boolean;
  previous: boolean;
}
@Component({
  selector: 'app-propositions',
  templateUrl: './propositions.component.html',
  styleUrls: ['./propositions.component.css'],
})
export class PropositionsComponent implements OnInit {
  public propositions: Propositions[] = [];
  public deputyId: number = 0;
  public pagination: Pagination = {} as Pagination;
  constructor(
    private propositionsService: PropositionsService,
    private route: ActivatedRoute
  ) {
    this.propositionsService
      .getData()
      .subscribe((data) => (this.propositions = data));
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.deputyId = params['id'];
    });
    this.fetchExpenses();
  }

  private async fetchExpenses() {
    await this.propositionsService.getExpenses(
      `https://dadosabertos.camara.leg.br/api/v2/proposicoes?idDeputadoAutor=${this.deputyId}&itens=5&ordenarPor=numero&ordem=asc`
    );

    this.pagination = this.propositionsService.pagination;
  }

  async nextPage() {
    const next = this.propositionsService.links.filter(
      (link) => link.rel === 'next'
    );
    await this.propositionsService.getExpenses(next[0].href);
  }

  async previousPage() {
    const previous = this.propositionsService.links.filter(
      (link) => link.rel === 'previous'
    );

    await this.propositionsService.getExpenses(previous[0].href);
  }
}
