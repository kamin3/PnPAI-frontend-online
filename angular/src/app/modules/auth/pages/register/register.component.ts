import { Component, OnInit } from '@angular/core';
import { City } from '@app/data/schema/city';
import { Country } from '@app/data/schema/country';
import { CountryService } from '@app/data/services/country.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  countries: Country[] = [];
  cities: City[] = [];
  constructor(private countryService: CountryService) {

  }
  ngOnInit(): void {
    this.getCountries();
  }

  getCountries() {
    this.countryService.getall().subscribe({
      next: (value) => {
        this.countries = value;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  selectCities(event: Event) {
    let countryName = (event.target as HTMLSelectElement).value;
    this.cities = this.countries.find(x => x.name == countryName)!.cities;
  }
}
