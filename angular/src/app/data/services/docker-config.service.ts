import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DockerConfig } from '../schema/docker-config';
import { Observable } from 'rxjs';
import { digocFunctionsResponse } from '../schema/digocFunctionsResponse';
@Injectable({
  providedIn: 'root'
})
export class DockerConfigService {

  constructor(private httpclient: HttpClient) { }
  headers = {
    "Content-Type": "application/json",
    "Authorization": `Basic ${environment.digitaloceanFunctionsURLToken}`
  };


  getDockerCompose(usecase: number): Observable<digocFunctionsResponse<DockerConfig>> {
    let domainURL = environment.digitaloceanFunctionsURL + 'quay_io/get_token?blocking=true&result=true';
    let input = {
      "usecase": "ecommerce"
    };
    return this.httpclient.post<digocFunctionsResponse<DockerConfig>>(domainURL, input, { headers: this.headers });
  }
}
