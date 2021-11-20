import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable, Subject } from 'rxjs';
import { Deputy, Links } from '../models/deputies.models';
import api from '../utils/request';

@Injectable({
  providedIn: 'root',
})
export class DeputiesService {
  public deputiesData: Subject<Deputy> = new Subject();
  public links: Links[] = [];
  constructor() {}

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
  }
}
