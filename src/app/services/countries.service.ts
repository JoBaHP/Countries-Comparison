import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  map} from 'rxjs/operators';
import { Country } from '../models';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
   // URL to API
   private apiServer = 'https://restcountries.eu/rest/v2';

  constructor(private http: HttpClient) { }

    /** GET countries from the API */
  getAll() {
    return this.http.get<Country[]>(`${this.apiServer}/all`);
  }
    getCountryByName(name: string) {
    return this.http
      .get<Country[]>(`${this.apiServer}/name/${name}`)
      .pipe(map(([res]) => res));
  }

    getCountriesByCodes(codes: string[]) {
    console.log(`${this.apiServer}/alhpa?codes=${codes.join(';')}`);
    return this.http.get<Country[]>(
      `${this.apiServer}/alpha?codes=${codes.join(';')}`
    );
  }
}
