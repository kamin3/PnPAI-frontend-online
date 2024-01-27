import { Component } from '@angular/core';
import { DockerConfigVolumes } from '@app/data/schema/docker-config';
import { DockerConfigService } from '@app/data/services/docker-config.service';
import { Image } from '@schema/image';

enum UseCaseState {
  Select = 1,
  ImagesVersions = 2,
  ImageConnectors = 3,
  TokenGenerated = 4,
  ImagePull = 5,
  Finished = 6
}

@Component({
  selector: 'app-new-use-case',
  templateUrl: './new-use-case.component.html',
  styleUrls: ['./new-use-case.component.css']
})
export class NewUseCaseComponent {

  useCaseState: UseCaseState = UseCaseState.Select;
  useCaseSteps: UseCaseState[] = [UseCaseState.Select];
  generatedToken: string = '';
  dockerComposeFile: string = '';
  volumesToConfig: DockerConfigVolumes[] = [];
  images: Image[] = [];
  connectors: Image[] = [];
  imageId: string | undefined = undefined;
  constructor(private dockerconfigService: DockerConfigService) {
  }


  getSelectedCaseImages(usecaseId: string) {
    this.dockerconfigService.getUsecaseImages(usecaseId).subscribe({
      next: (value) => {
        this.images = value.message;
        if (this.images && this.images.length > 1) {
          this.useCaseState = UseCaseState.ImagesVersions;
          this.useCaseSteps.push(UseCaseState.ImagesVersions);
        }
        else
          this.getImageConnectors(this.images[0].id);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getImageConnectors(imageId: string) {
    this.imageId = imageId;
    this.dockerconfigService.getImageConnectors(imageId).subscribe({
      next: (value) => {
        this.connectors = value.message;
        if (this.connectors && this.connectors.length > 1) {
          this.useCaseState = UseCaseState.ImageConnectors;
          this.useCaseSteps.push(UseCaseState.ImageConnectors);
        }
        else
          this.getDockerCompose(imageId);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  getDockerComposeWithConnectorId(connector_id: string) {
    this.getDockerCompose(this.imageId!, connector_id);
  }

  getDockerCompose(imageId: string, connectorId: string | undefined = undefined) {
    this.dockerconfigService.getDockerCompose(imageId, connectorId).subscribe({
      next: (value) => {
        this.generatedToken = value.message.token;
        this.dockerComposeFile = value.message.file;
        this.volumesToConfig = value.message.volumesToConfigure ?? [];
        this.useCaseState = UseCaseState.TokenGenerated;
        this.useCaseSteps.push(UseCaseState.TokenGenerated);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  getBack() {
    this.useCaseSteps.pop();
    this.useCaseState = this.useCaseSteps[this.useCaseSteps.length - 1];
    ;
  }

  goToPullImage() {
    this.useCaseState = UseCaseState.ImagePull;
    this.useCaseSteps.push(UseCaseState.ImagePull);
  }

  finish() {
    this.useCaseState = UseCaseState.Finished;
    this.useCaseSteps.push(UseCaseState.Finished);
  }


}
