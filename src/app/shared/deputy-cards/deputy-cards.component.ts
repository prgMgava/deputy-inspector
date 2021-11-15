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
  constructor(private deputiesService: DeputiesService) {}

  ngOnInit(): void {
    // this.fetchDeputies();
  }

  private async fetchDeputies() {
    const data: Deputy[] = await this.deputiesService.getTenDeputies();
    this.deputies = data;
    console.log(this.deputies);
  }
}

// TODO: transformar siglas para nome extenso
