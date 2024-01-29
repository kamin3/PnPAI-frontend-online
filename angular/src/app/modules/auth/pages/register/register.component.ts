import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { City } from '@app/data/schema/city';
import { Country } from '@app/data/schema/country';
import { Industry } from '@app/data/schema/industry';
import { userSignupInput } from '@app/data/schema/userSignupInput';
import { AccountService } from '@app/data/services/account.service';
import { CountryService } from '@app/data/services/country.service';
import { IndustryService } from '@app/data/services/industry.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CONFIG } from '@app/shared/configs';
import { ValidateBusinessEmail } from '@app/shared/validators/businessEmail.validator';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  countries: Country[] = [];
  industries: Industry[] = [];
  cities: City[] = [];
  registrationForm: FormGroup | undefined;
  resultMessage: string | undefined = undefined;
  resgiterationSuccess: boolean = false;
  homeRoute = CONFIG.dashboard.route;
  loginLink = CONFIG.auth.children.login.route;
  landingPageRoute = CONFIG.landing.children.landing.route;
  @ViewChild('showresult') showModalBTN!: ElementRef<HTMLButtonElement>;

  constructor(
    private fb: FormBuilder,
    private countryService: CountryService,
    private indusrtyService: IndustryService,
    private accountService: AccountService,
    private router: Router

  ) {

  }
  ngOnInit(): void {
    if (this.accountService.isLoggedIn())
      this.router.navigateByUrl(this.homeRoute);
    this.registrationForm = this.fb.group({
      companyName: ["", Validators.required],
      country: ["", Validators.required],
      city: [""],
      street: [""],
      postalCode: [""],
      websiteurl: [""], // should validate against valid url
      industryId: ["", Validators.required],
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      phoneNumber: ["", [Validators.pattern(/^(00|\+)\d+$/)]],
      email: ["", [Validators.required, Validators.email, ValidateBusinessEmail]], // should validate against business email
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
    if (!this.registrationForm!.valid) {
    }
    let industryName = this.industries.find(i => i.id == this.registrationForm?.value.industryId)?.name;
    let input: userSignupInput = {
      "user_data": {
        "user_id": this.registrationForm?.value.email,
        "first_name": this.registrationForm?.value.firstName,
        "last_name": this.registrationForm?.value.lastName,
        "email": this.registrationForm?.value.email,
        "phone": this.registrationForm?.value.phoneNumber ? this.registrationForm?.value.phoneNumber : null,
        "role": "User"
      },
      "raw_password": this.registrationForm?.value.password,
      "org_data": {
        "organization_name": this.registrationForm?.value.companyName,
        "address": {
          "postal_code": this.registrationForm?.value.postalCode ? this.registrationForm?.value.postalCode : null,
          "street": this.registrationForm?.value.street ? this.registrationForm?.value.street : null,
          "city": this.registrationForm?.value.city ? this.registrationForm?.value.city : null,
          "country": this.registrationForm?.value.country ? this.registrationForm?.value.country : null
        },
        "status": "Active",
        "industry_id": this.registrationForm?.value.industryId,
        "industry_name": industryName,
        "website_url": this.registrationForm?.value.websiteurl ? this.registrationForm?.value.websiteurl : null
      }
    };

    this.accountService.userSignup(input).subscribe({
      next: (value) => {
        return this.registerSuccess();
      },
      error: (err) => {
        this.registerFailed(err);
      },
    });
  }


  private registerSuccess() {
    this.resultMessage = "Registeration successful";
    this.resgiterationSuccess = true;
    this.showModalBTN.nativeElement.click();
  }

  private registerFailed(err: any) {
    this.resultMessage = err.error.message;
    this.resgiterationSuccess = false;
    this.showModalBTN.nativeElement.click();
    console.log(err);
  }

  setAllTouched() {
    Object.keys(this.registrationForm!.controls).forEach(controlName => {
      if (this.registrationForm!.get(controlName)!.untouched)
        this.registrationForm!.get(controlName)!.markAsTouched();
    });
  }

  selectCities(event: Event) {
    let countryName = (event.target as HTMLSelectElement).value;
    this.cities = this.countries.find(x => x.name == countryName)!.cities;
  }
}
