import { Component, OnInit } from '@angular/core';
import { AccountService } from '@app/data/services/account.service';
import { CONFIG } from '@app/shared/configs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentUrl = window.location.href;
  isUserLoggedIn: boolean = false;
  landingRoute = CONFIG.landing.children.landing.route;
  loginRoute = CONFIG.auth.children.login.route;
  registerRoute = CONFIG.auth.children.register.route;
  dashboardRoute = CONFIG.dashboard.children.dashboard.route;
  showSpecial: Boolean = true;

  constructor(
    private accountService: AccountService,
  ) {

  }

  ngOnInit(): void {
    this.isUserLoggedIn = this.accountService.isLoggedIn();
  }
}
