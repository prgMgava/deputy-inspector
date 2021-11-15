import { Injectable } from '@angular/core';
import { Deputy } from '../models/deputies.models';
import api from '../utils/request';

@Injectable({
  providedIn: 'root',
})
export class DeputiesService {
  public deputiesData: Deputy[] = [];
  constructor() {
    this.getAll();
  }

  async getTenDeputies() {
    const data = await api
      .get('/deputados?itens=10')
      .then((response) => response.data.dados)
      .catch((err) => console.log(err));
    return data;
  }

  private async getAll() {
    const data = await api
      .get('/deputados')
      .then((response) => (this.deputiesData = response.data.dados))
      .catch((err) => console.log(err));
    console.log('get all');
  }
}
