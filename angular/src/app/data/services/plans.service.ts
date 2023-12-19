import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Plan } from '@schema/plan';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { digocFunctionsResponse } from '@schema/digocFunctionsResponse';

@Injectable({
  providedIn: 'root',
})
export class PlansService {
  constructor(private httpclient: HttpClient) {}
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
}
