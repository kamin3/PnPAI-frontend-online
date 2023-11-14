import { Observable, of, pipe, map, toArray } from 'rxjs';
import { Injectable } from '@angular/core';
import { Country } from '@schema/country';
import data from '@assets/data/countries_cities.json';
import { City } from '../schema/city';


@Injectable({
    providedIn: 'root'
})
export class CountryService {

    countries_data: { [key: string]: string[]; } = data;
    getall(): Observable<Country[]> {
        let countries: Country[] = [];
        for (const key in this.countries_data) {
            let cities: City[] = this.countries_data[key].map((item) => { return { name: item }; });
            let country = {
                name: key,
                cities: cities
            };
            countries.push(country);
        }
        return of(countries);
    }
}
