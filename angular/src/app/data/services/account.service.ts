import { Observable, of, pipe, map } from 'rxjs';
import data from '@app/data/json/account_data.json';
import { Injectable } from '@angular/core';
import { Account } from '../schema/account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  get(): Observable<Account> {
    return of(data.AccountsTab).pipe(
      map((item: any) => ({
        image: item.Image,
        email: item.Email,
        lastLoginDate: item.LastLoginDate,
        name: item.Name,
        subscriptionDaysLeft:item.SubscriptionDaysLeft
      } as Account))
    );
  }
}
