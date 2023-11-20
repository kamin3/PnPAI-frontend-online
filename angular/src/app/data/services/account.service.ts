import { Observable, of, map } from 'rxjs';
import data from '@app/data/json/account_data.json';
import { Injectable } from '@angular/core';
import { Account } from '@schema/account';
import { userSigninInput } from '@app/data/schema/userSigninInput';
import { userSignupInput } from '@app/data/schema/userSignupInput';
import { digocFunctionsResponse } from '@schema/digocFunctionsResponse';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { userSigninResponse } from '@schema/userSigninResponse';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private httpclient: HttpClient) { }
  headers = {
    "Content-Type": "application/json",
    "Authorization": `Basic ${environment.digitaloceanFunctionsURLToken}`
  };

  get(): Observable<Account> {
    return of(data.AccountsTab).pipe(
      map((item: any) => ({
        image: item.Image,
        email: item.Email,
        lastLoginDate: item.LastLoginDate,
        name: item.Name,
        subscriptionDaysLeft: item.SubscriptionDaysLeft
      } as Account))
    );
  }

  userSignup(input: userSignupInput): Observable<digocFunctionsResponse<string>> {
    let domainURL = environment.digitaloceanFunctionsURL + 'account_services/user_signup?blocking=true&result=true';
    return this.httpclient.post<digocFunctionsResponse<string>>(domainURL, input, { headers: this.headers });
  }

  signin(input: userSigninInput): Observable<userSigninResponse> {
    let domainURL = environment.digitaloceanFunctionsURL + 'account_services/login?blocking=true&result=true';
    return this.httpclient.post<userSigninResponse>(domainURL, input, { headers: this.headers });
  }
}
