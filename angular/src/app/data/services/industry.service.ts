import { Observable, of, pipe, map, toArray } from 'rxjs';
import { Injectable } from '@angular/core';
import { Industry } from '@schema/industry';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { digocFunctionsResponse } from '@schema/digocFunctionsResponse';
import { AccountService } from '@app/data/services/account.service';

@Injectable({
    providedIn: 'root'
})
export class IndustryService {


    constructor(
        private httpclient: HttpClient,
        private accountService: AccountService,
    ) { }
    headers = {
        "Content-Type": "application/json"
    };


    getAll(): Observable<digocFunctionsResponse<Industry[]>> {
        let domainURL = environment.kongURL + 'postgres/industry_controller';
        let input = {
            "operation": "getall"
        };
        return this.httpclient.post<digocFunctionsResponse<Industry[]>>(domainURL, input, { headers: this.headers });
    }

    getWithUseCases(industry_id: string): Observable<digocFunctionsResponse<Industry[]>> {
        let domainURL = environment.kongURL + 'postgres/industry_controller';
        let input = {
            "operation": "get_with_usecases",
            "industry_id": industry_id // "IND-123"
        };
        return this.httpclient.post<digocFunctionsResponse<Industry[]>>(domainURL, input, { headers: this.headers });
    }

    getUserIndustryId() {
        let userToken = this.accountService.getToken();
        let payload = JSON.parse(atob(userToken!.split('.')[1]));
        return payload['industry_id'];
    }
}
