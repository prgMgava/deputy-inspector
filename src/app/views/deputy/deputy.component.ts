import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeputiesService } from 'src/app/context/deputies.service';
import { Deputy } from 'src/app/models/deputies.models';
import { Events } from 'src/app/models/events.models';
import api from 'src/app/utils/request';

@Component({
  selector: 'app-deputy',
  templateUrl: './deputy.component.html',
  styleUrls: ['./deputy.component.css'],
})
export class DeputyComponent implements OnInit {
  public deputyId: number = 0;
  public deputy: Deputy = {} as Deputy;
  public allEvents: Events[] = [];
  public lastEvent: Events[] = [];
  public nextEvent: Events[] = [];

  constructor(
    private route: ActivatedRoute,
    private deputiesService: DeputiesService
  ) {
    this.deputiesService
      .getDeputiesData()
      .subscribe((data) => (this.deputy = data));
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.deputyId = params['id'];
    });
    this.fetchDeputies();
  }

  private async fetchDeputies() {
    await this.deputiesService.getTenDeputies(
      `https://dadosabertos.camara.leg.br/api/v2/deputados/${this.deputyId}`
    );
    await api
      .get(`deputados/${this.deputyId}/eventos?ordem=desc`)
      .then((response) => (this.allEvents = response.data.dados))
      .catch((e) => console.log(e));
    this.getEvents();
  }

  getEvents() {
    this.lastEvent = this.allEvents.filter((event) =>
      event.situacao.includes('Encerrada')
    );

    if (!!this.lastEvent.length) {
      this.lastEvent = [this.lastEvent[0]];
    }
    this.nextEvent = this.allEvents.filter((event) =>
      event.situacao.includes('Convocada')
    );
    if (!!this.nextEvent.length) {
      this.nextEvent = [this.nextEvent[0]];
    }
    console.log(this.nextEvent);
  }
}
