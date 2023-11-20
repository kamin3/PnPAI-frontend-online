import { Observable, of, pipe, map, toArray } from 'rxjs';
import { Injectable } from '@angular/core';
import { Country } from '@schema/country';
import data from '@assets/data/countries_cities.json';
import { City } from '@schema/city';


@Injectable({
    providedIn: 'root'
})
export class CountryService {

    countries_data: { name: string; states: { name: string; }[]; }[] = data;
    getall(): Observable<Country[]> {
        let countries: Country[] = [];
        for (const country_data of this.countries_data) {
            let cities: City[] = country_data.states.map((item) => { return { name: item.name }; });
            let country = {
                name: country_data.name,
                cities: cities
            };
            countries.push(country);
        }
        return of(countries);
    }
}
