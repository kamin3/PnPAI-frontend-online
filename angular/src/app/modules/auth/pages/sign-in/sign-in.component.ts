import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { userSigninInput } from '@schema/userSigninInput';
import { AccountService } from '@app/data/services/account.service';
import { CONFIG } from '@app/shared/configs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  homeRoute = CONFIG.home.route;

  signinForm: FormGroup | undefined;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router

  ) {


  }
  ngOnInit(): void {
    this.signinForm = this.fb.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    });
  }


  onSubmit() {
    if (!this.signinForm!.valid) {
    }
    let input: userSigninInput = {
      "login_email": this.signinForm?.value.email,
      "raw_password": this.signinForm?.value.password
    };

    this.accountService.signin(input).subscribe({
      next: (value) => {
        localStorage.setItem('accessToken', value.jwt_token);
        this.router.navigateByUrl(this.homeRoute);
      },
      error: (err) => {
        console.log(err);
      },
    });
  };

  setAllTouched() {
    Object.keys(this.signinForm!.controls).forEach(controlName => {
      if (this.signinForm!.get(controlName)!.untouched)
        this.signinForm!.get(controlName)!.markAsTouched();
    });
  }
}
