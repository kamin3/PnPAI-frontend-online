import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Plan } from '@schema/plan';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { digocFunctionsResponse } from '@schema/digocFunctionsResponse';
import { HostedPage } from '@schema/hostedPage';

@Injectable({
  providedIn: 'root',
})
export class PlansService {
  constructor(private httpclient: HttpClient) { }
  headers = {
    'Content-Type': 'application/json',
    Authorization: `Basic ${environment.digitaloceanFunctionsURLToken}`,
  };

  getAll(): Observable<digocFunctionsResponse<Plan[]>> {
    let domainURL =
      environment.digitaloceanFunctionsURL +
      'payment_services/plans?blocking=true&result=true';
    return this.httpclient.post<digocFunctionsResponse<Plan[]>>(
      domainURL,
      {},
      {
        headers: this.headers,
      }
    );
  }

  checkout(plan_price_id: string): Observable<digocFunctionsResponse<HostedPage>> {
    let domainURL =
      environment.digitaloceanFunctionsURL +
      'payment_services/checkout?blocking=true&result=true';
    return this.httpclient.post<digocFunctionsResponse<HostedPage>>(
      domainURL,
      {
        "plan_price_id": plan_price_id
      },
      {
        headers: this.headers,
      }
    );
  }
}
