import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeputiesService } from 'src/app/context/deputies.service';
import { Deputy } from 'src/app/models/deputies.models';

@Component({
  selector: 'app-deputy',
  templateUrl: './deputy.component.html',
  styleUrls: ['./deputy.component.css'],
})
export class DeputyComponent implements OnInit {
  public deputyId: number = 0;
  public deputy: Deputy = {} as Deputy;

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
  }
}
