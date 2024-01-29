import { Observable, of, map } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { JoinUsInput } from '@schema/joinusInput';
import { JoinUsResponse } from '@schema/joinusResponse';

@Injectable({
    providedIn: 'root'
})
export class JoinUsService {

    constructor(private httpclient: HttpClient) { }
    headers = {
        "Content-Type": "application/json"
    };

    sendJoinUsEmail(input: JoinUsInput): Observable<JoinUsResponse> {
        let domainURL = environment.kongURL + 'email/joinus';
        return this.httpclient.post<JoinUsResponse>(domainURL, input, { headers: this.headers });
    };
}