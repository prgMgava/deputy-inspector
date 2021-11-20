import { query } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DeputiesService } from 'src/app/context/deputies.service';
import { FormDataDeputy } from 'src/app/models/formData.models';
import { State } from 'src/app/models/stateModels';
import { states } from 'src/app/utils/states';

@Component({
  selector: 'app-form-search',
  templateUrl: './form-search.component.html',
  styleUrls: ['./form-search.component.css'],
})
export class FormSearchComponent implements OnInit {
  public states: State[] = states;
  public form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private deputiesService: DeputiesService
  ) {
    this.form = this.fb.group({
      nome: [''],
      siglaUf: [''],
      siglaPartido: [''],
      siglaSexo: [''],
    });
  }
  onSubmit() {
    const data: FormDataDeputy = {
      nome: this.form.value.nome,
      siglaUf: this.form.value.siglaUf,
      siglaPartido: this.form.value.siglaPartido,
      siglaSexo: this.form.value.siglaSexo,
    };
    const query = this.formatedQuery(data);
    if (!!query) {
      this.deputiesService.getTenDeputies(
        `https://dadosabertos.camara.leg.br/api/v2/deputados?itens=10&${query}`
      );
    }
  }

  ngOnInit(): void {}

  formatedQuery(data: FormDataDeputy) {
    const parameters = Object.entries(data);
    const query = parameters
      .filter((item) => !!item[1])
      .map((item) => item.join('='))
      .join('&');
    return query;
  }
}
