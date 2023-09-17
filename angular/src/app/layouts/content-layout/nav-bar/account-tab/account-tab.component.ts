import { Component, OnInit } from '@angular/core';
import { Account } from '@app/data/schema/account';
import { AccountService } from '@app/data/services/account.service';

@Component({
  selector: 'app-account-tab',
  templateUrl: './account-tab.component.html',
  styleUrls: ['./account-tab.component.css']
})
export class AccountTabComponent implements OnInit {

  account!: Account;

  constructor(private accountService: AccountService) {

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
}
