import { Observable, of, map } from 'rxjs';
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

  private token_key = 'accessToken';
  constructor(private httpclient: HttpClient) { }
  headers = {
    "Content-Type": "application/json"
  };

  get(): Observable<Account> {
    let domainURL = environment.kongURL + 'account_services/user_details';
    return this.httpclient.post<Account>(domainURL, { headers: this.headers });
  }

  userSignup(input: userSignupInput): Observable<digocFunctionsResponse<string>> {
    let domainURL = environment.kongURL + 'account_services/user_signup';
    return this.httpclient.post<digocFunctionsResponse<string>>(domainURL, input, { headers: this.headers });
  }

  signin(input: userSigninInput): Observable<userSigninResponse> {
    let domainURL = environment.kongURL + 'account_services/login';
    return this.httpclient.post<userSigninResponse>(domainURL, input, { headers: this.headers });
  }

  saveToken(token: string) {
    localStorage.setItem(this.token_key, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.token_key);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem(this.token_key) != null;
  }

  logout() {
    localStorage.removeItem(this.token_key);
  }
}
