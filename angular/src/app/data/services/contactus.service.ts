import { Observable, of, map } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ContactUsInput } from '@schema/contactusInput';
import { ContactUsResponse } from '@schema/contactusResponse';

@Injectable({
    providedIn: 'root'
})
export class ContactUsService {

    constructor(private httpclient: HttpClient) { }
    headers = {
        "Content-Type": "application/json"
    };

    sendContactUsEmail(input: ContactUsInput): Observable<ContactUsResponse> {
        let domainURL = environment.kongURL + 'email/contactus';
        return this.httpclient.post<ContactUsResponse>(domainURL, input, { headers: this.headers });
    };
}