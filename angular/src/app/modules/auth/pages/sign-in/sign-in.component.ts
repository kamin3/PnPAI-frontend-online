import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { userSigninInput } from '@schema/userSigninInput';
import { AccountService } from '@app/data/services/account.service';
import { CONFIG } from '@app/shared/configs';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '@app/shared/services/alert.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  homeRoute = CONFIG.dashboard.route;
  registerRoute = CONFIG.auth.children.register.route;
  failedLoginMessage?: string = undefined;

  signinForm: FormGroup | undefined;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService

  ) {


  }
  ngOnInit(): void {
    if (this.accountService.isLoggedIn())
      this.router.navigateByUrl(this.homeRoute);

    this.signinForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required]
    });
  }


  onSubmit() {
    if (!this.signinForm!.valid) {
    }
    this.failedLoginMessage = undefined;
    let input: userSigninInput = {
      "login_email": this.signinForm?.value.email,
      "raw_password": this.signinForm?.value.password
    };

    this.accountService.signin(input).subscribe({
      next: (value) => {
        return this.signinSuccess(value.jwt_token);
      },
      error: (err) => {
        if (err.status != 500) {
          this.failedLoginMessage = err.error.message;
          this.alertService.showFailureAlert(err.error.message);
          return;
        }
        this.alertService.showFailureAlert(err.error.message);
        console.log(err);
      },
    });
  };

  private signinSuccess(token: string) {
    this.accountService.saveToken(token);
    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || this.homeRoute;
    this.router.navigateByUrl(returnUrl);
  }

  setAllTouched() {
    Object.keys(this.signinForm!.controls).forEach(controlName => {
      if (this.signinForm!.get(controlName)!.untouched)
        this.signinForm!.get(controlName)!.markAsTouched();
    });
  }
}
