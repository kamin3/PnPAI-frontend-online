import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Account } from '@app/data/schema/account';
import { AccountService } from '@app/data/services/account.service';
import { CONFIG } from '@app/shared/configs';
import { AlertService } from '@app/shared/services/alert.service';

@Component({
  selector: 'app-account-tab',
  templateUrl: './account-tab.component.html',
  styleUrls: ['./account-tab.component.css']
})
export class AccountTabComponent implements OnInit {

  account: Account | undefined;
  signinRoute: string = CONFIG.auth.children.login.route;
  dashboardRoute: string = CONFIG.dashboard.children.dashboard.route;

  constructor(
    private accountService: AccountService,
    private router: Router,
    private alertService: AlertService) {

  }
  ngOnInit(): void {
    this.accountService.get().subscribe({
      next: (value) => {
        this.account = value;
      },
      error: (err) => {
        console.log(err);
        this.alertService.showAlert(err.error.message);
      },
    });
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl(this.signinRoute);
  }
}
