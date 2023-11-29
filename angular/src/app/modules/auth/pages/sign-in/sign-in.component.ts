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
  registerRoute = CONFIG.auth.children.register.route;

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
        if (value.status_code == 200)
          return this.signinSuccess(value.jwt_token);
        console.log(value.message);
      },
      error: (err) => {
        console.log(err);
      },
    });
  };

  private signinSuccess(token: string) {
    this.accountService.saveToken(token);
    this.router.navigateByUrl(this.homeRoute);
  }

  setAllTouched() {
    Object.keys(this.signinForm!.controls).forEach(controlName => {
      if (this.signinForm!.get(controlName)!.untouched)
        this.signinForm!.get(controlName)!.markAsTouched();
    });
  }
}
