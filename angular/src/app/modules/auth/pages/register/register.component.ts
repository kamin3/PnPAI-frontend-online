import { Component, OnInit } from '@angular/core';
import { City } from '@app/data/schema/city';
import { Country } from '@app/data/schema/country';
import { Industry } from '@app/data/schema/industry';
import { userSignupInput } from '@app/data/schema/userSignupInput';
import { AccountService } from '@app/data/services/account.service';
import { CountryService } from '@app/data/services/country.service';
import { IndustryService } from '@app/data/services/industry.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  countries: Country[] = [];
  industries: Industry[] = [];
  cities: City[] = [];
  reactiveForm: FormGroup | undefined;
  constructor(
    private fb: FormBuilder,
    private countryService: CountryService,
    private indusrtyService: IndustryService,
    private accountService: AccountService
  ) {

  }
  ngOnInit(): void {
    this.reactiveForm = this.fb.group({
      companyName: ["", Validators.required],
      country: ["", Validators.required],
      city: ["", Validators.required],
      street: [""],
      postalCode: ["", Validators.required],
      websiteurl: [""], // should validate against valid url
      industryId: ["", Validators.required],
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      phoneNumber: ["", Validators.required], // should validate against start with code + or 00
      email: ["", [Validators.required, Validators.email]], // should validate against business email
      password: ["", [Validators.required]],
      acceptTerms: ["", Validators.requiredTrue],
    });
    this.getCountries();
  }

  getCountries() {
    this.countryService.getall().subscribe({
      next: (value) => {
        this.countries = value;
        this.getIndustries();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getIndustries() {
    this.indusrtyService.getAll().subscribe({
      next: (value) => {
        this.industries = value.message;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }


  onSubmit() {
    if (!this.reactiveForm!.valid) {
    }
    let input: userSignupInput = {
      "user_data": {
        "user_id": this.reactiveForm?.value.email,
        "first_name": this.reactiveForm?.value.firstName,
        "last_name": this.reactiveForm?.value.lastName,
        "email": this.reactiveForm?.value.email,
        "phone": this.reactiveForm?.value.phoneNumber,
        "role": "User"
      },
      "raw_password": this.reactiveForm?.value.password,
      "org_data": {
        "organization_name": this.reactiveForm?.value.companyName,
        "address": {
          "postal_code": this.reactiveForm?.value.postalCode,
          "street": this.reactiveForm?.value.street,
          "city": this.reactiveForm?.value.city,
          "country": this.reactiveForm?.value.country
        },
        "status": "Active",
        "industry_id": this.reactiveForm?.value.industryId,
        "website_url": this.reactiveForm?.value.websiteurl
      }
    };

    this.accountService.userSignup(input).subscribe({
      next: (value) => {
        console.log(value.message);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  setAllTouched() {
    Object.keys(this.reactiveForm!.controls).forEach(controlName => {
      if (this.reactiveForm!.get(controlName)!.untouched)
        this.reactiveForm!.get(controlName)!.markAsTouched();
    });
  }

  selectCities(event: Event) {
    let countryName = (event.target as HTMLSelectElement).value;
    this.cities = this.countries.find(x => x.name == countryName)!.cities;
  }
}
