import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DockerConfig } from '@schema/docker-config';
import { Observable } from 'rxjs';
import { digocFunctionsResponse } from '@schema/digocFunctionsResponse';
@Injectable({
  providedIn: 'root'
})
export class DockerConfigService {

  constructor(private httpclient: HttpClient) { }
  headers = {
    "Content-Type": "application/json",
    "Authorization": `Basic ${environment.digitaloceanFunctionsURLToken}`
  };


  getDockerCompose(usecase_id: string): Observable<digocFunctionsResponse<DockerConfig>> {
    let domainURL = environment.digitaloceanFunctionsURL + 'postgres/image_controller?blocking=true&result=true';
    let input = {
      "operation": "get_docker_compose",
      "usecase_id": usecase_id
    };
    return this.httpclient.post<digocFunctionsResponse<DockerConfig>>(domainURL, input, { headers: this.headers });
  }
}
