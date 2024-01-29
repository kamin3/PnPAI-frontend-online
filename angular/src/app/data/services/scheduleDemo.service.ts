import { Observable, of, map } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ScheduleDemoInput } from '@schema/scheduleDemoInput';
import { ScheduleDemoResponse } from '@schema/scheduleDemoResponse';

@Injectable({
    providedIn: 'root'
})
export class ScheduleDemoService {

    constructor(private httpclient: HttpClient) { }
    headers = {
        "Content-Type": "application/json"
    };

    ScheduleDemo(input: ScheduleDemoInput): Observable<ScheduleDemoResponse> {
        let domainURL = environment.kongURL + 'email/scheduledemo';
        return this.httpclient.post<ScheduleDemoResponse>(domainURL, input, { headers: this.headers });
    };
}