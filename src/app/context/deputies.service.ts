import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable, Subject } from 'rxjs';
import { Deputy, Links } from '../models/deputies.models';
import api from '../utils/request';

@Injectable({
  providedIn: 'root',
})
export class DeputiesService {
  // public deputiesData: Deputy[] = [];
  public deputiesData: Subject<Deputy> = new Subject();
  public query: string = '';
  public links: Links[] = [];
  constructor() {
    // this.getAll();
  }

  setDeputiesData(newValue: Deputy) {
    this.deputiesData.next(newValue);
  }

  getDeputiesData(): Observable<any> {
    return this.deputiesData.asObservable();
  }

  async getTenDeputies(path: string) {
    const data = await axios
      .get(path)
      .then((response) => {
        this.setDeputiesData(response.data.dados);
        this.links = response.data.links;
      })
      .catch((err) => console.log(err));
    // this.setDeputiesData(data);
  }

  // private async getAll() {
  //   const data = await api
  //     .get('/deputados')
  //     .then((response) => (this.deputiesData = response.data.dados))
  //     .catch((err) => console.log(err));
  //   console.log('get all');
  // }

  // async getDeputiesByQueryParams(query: string) {
  //   const data = await api
  //     .get(`/deputados?${query}&itens=10`)
  //     .then((response) => response.data.dados)
  //     .catch((e) => console.log(e));
  //   this.setDeputiesData(data);

  //   console.log(data);
  // }
}
