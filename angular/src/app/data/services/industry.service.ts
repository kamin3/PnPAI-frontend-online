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
        "Content-Type": "application/json",
        "Authorization": `Basic ${environment.digitaloceanFunctionsURLToken}`
    };


    getall(industry_id: string, include_usecases: boolean = false): Observable<digocFunctionsResponse<Industry[]>> {
        let domainURL = environment.digitaloceanFunctionsURL + 'postgres/industry_controller?blocking=true&result=true';
        if (include_usecases) {
            let input = {
                "operation": "getall"
            };
            return this.httpclient.post<digocFunctionsResponse<Industry[]>>(domainURL, input, { headers: this.headers });
        }
        let input = {
            "operation": "get_with_usecases",
            "industry_id": industry_id // "IND-123"
        };
        return this.httpclient.post<digocFunctionsResponse<Industry[]>>(domainURL, input, { headers: this.headers });
    }
}
