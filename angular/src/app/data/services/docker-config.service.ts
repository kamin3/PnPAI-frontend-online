import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DockerConfig } from '@schema/docker-config';
import { Observable } from 'rxjs';
import { digocFunctionsResponse } from '@schema/digocFunctionsResponse';
import { Image } from '@schema/image';
@Injectable({
  providedIn: 'root'
})
export class DockerConfigService {

  constructor(private httpclient: HttpClient) { }
  private headers = {
    "Content-Type": "application/json"
  };
  private domainURL = environment.kongURL + 'postgres/image_controller';



  getUsecaseImages(usecaseId: string): Observable<digocFunctionsResponse<Image[]>> {
    let input = {
      "operation": "get_usecase_images",
      "usecase_id": usecaseId
    };
    return this.httpclient.post<digocFunctionsResponse<Image[]>>(
      this.domainURL, input,
      { headers: this.headers });
  }

  getImageConnectors(imageId: string): Observable<digocFunctionsResponse<Image[]>> {
    let input = {
      "operation": "get_image_connectors",
      "image_id": imageId
    };
    return this.httpclient.post<digocFunctionsResponse<Image[]>>(
      this.domainURL, input,
      { headers: this.headers });
  }

  getDockerCompose(imageId: string, connectorId: string | undefined = undefined): Observable<digocFunctionsResponse<DockerConfig>> {
    let input = {
      "operation": "get_docker_compose",
      "image_id": imageId,
      "connector_id": connectorId
    };
    return this.httpclient.post<digocFunctionsResponse<DockerConfig>>(
      this.domainURL, input,
      { headers: this.headers });
  }
}
