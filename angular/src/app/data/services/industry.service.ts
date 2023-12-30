import { Observable, of, pipe, map, toArray } from 'rxjs';
import { Injectable } from '@angular/core';
import { Industry } from '@schema/industry';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { digocFunctionsResponse } from '@schema/digocFunctionsResponse';

@Injectable({
    providedIn: 'root'
})
export class IndustryService {


    constructor(private httpclient: HttpClient) { }
    headers = {
        "Content-Type": "application/json"
    };


    getAll(): Observable<digocFunctionsResponse<Industry[]>> {
        let domainURL = environment.kongURL + 'postgres/industry_controller?blocking=true&result=true';
        let input = {
            "operation": "getall"
        };
        return this.httpclient.post<digocFunctionsResponse<Industry[]>>(domainURL, input, { headers: this.headers });
    }

    getWithUseCases(industry_id: string): Observable<digocFunctionsResponse<Industry[]>> {
        let domainURL = environment.kongURL + 'postgres/industry_controller?blocking=true&result=true';
        let input = {
            "operation": "get_with_usecases",
            "industry_id": industry_id // "IND-123"
        };
        return this.httpclient.post<digocFunctionsResponse<Industry[]>>(domainURL, input, { headers: this.headers });
    }
}
