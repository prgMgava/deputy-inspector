import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DeputiesService } from 'src/app/context/deputies.service';
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
  async onSubmit() {
    const data = {
      nome: this.form.value.nome,
      siglaUf: this.form.value.siglaUf,
      siglaPartido: this.form.value.siglaPartido,
      siglaSexo: this.form.value.siglaSexo,
    };
    console.log(data);
    const { deputiesData } = await this.deputiesService;
    console.log(deputiesData);
  }

  ngOnInit(): void {}
}
