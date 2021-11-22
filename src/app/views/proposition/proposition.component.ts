import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PropositionsService } from 'src/app/context/propositions.service';
import { Proposition } from 'src/app/models/propositions';

@Component({
  selector: 'app-proposition',
  templateUrl: './proposition.component.html',
  styleUrls: ['./proposition.component.css'],
})
export class PropositionComponent implements OnInit {
  public proposition: Proposition = {} as Proposition;
  public propositionId: number = 0;
  constructor(
    private route: ActivatedRoute,
    private propositionsService: PropositionsService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.propositionId = params['id'];
    });
    this.fetchDeputies();
  }

  private async fetchDeputies() {
    this.proposition = await this.propositionsService.getSpecificProposition(
      `https://dadosabertos.camara.leg.br/api/v2/proposicoes/${this.propositionId}`
    );
  }

  redirectTo() {
    const deputyId: number = Number(localStorage.getItem('deputyId')) || 0;
    return ['/deputy', deputyId];
  }
}
