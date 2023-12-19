import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Account } from '@app/data/schema/account';
import { AccountService } from '@app/data/services/account.service';
import { CONFIG } from '@app/shared/configs';

@Component({
  selector: 'app-account-tab',
  templateUrl: './account-tab.component.html',
  styleUrls: ['./account-tab.component.css']
})
export class AccountTabComponent implements OnInit {

  account!: Account;
  signinRoute: string = CONFIG.auth.children.login.route;

  constructor(
    private accountService: AccountService,
    private router: Router) {

  }
  ngOnInit(): void {
    this.accountService.get().subscribe({
      next: (value) => {
        this.account = value;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl(this.signinRoute);
  }
}
