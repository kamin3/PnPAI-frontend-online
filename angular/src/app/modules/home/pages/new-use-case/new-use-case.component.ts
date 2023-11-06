import { Component } from '@angular/core';
import { DockerConfigVolumes } from '@app/data/schema/docker-config';
import { DockerConfigService } from '@app/data/services/docker-config.service';
import { Image } from '@schema/image';

enum UseCaseState {
  Select = 1,
  ImagesVersions = 2,
  TokenGenerated = 3,
  ImagePull = 4,
  Finished = 5
}

@Component({
  selector: 'app-new-use-case',
  templateUrl: './new-use-case.component.html',
  styleUrls: ['./new-use-case.component.css']
})
export class NewUseCaseComponent {

  useCaseState: UseCaseState = UseCaseState.Select;
  generatedToken: string = '';
  dockerComposeFile: string = '';
  volumesToConfig: DockerConfigVolumes[] = [];
  images: Image[] = [];

  constructor(private dockerconfigService: DockerConfigService) {
  }


  getSelectedCaseImages(usecaseId: string) {
    this.dockerconfigService.getUsecaseImages(usecaseId).subscribe({
      next: (value) => {
        this.images = value.message;
        if (this.images && this.images.length > 1)
          this.useCaseState = UseCaseState.ImagesVersions;
        else
          this.getDockerCompose(this.images[0].id);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getDockerCompose(imageId: string) {
    this.dockerconfigService.getDockerCompose(imageId).subscribe({
      next: (value) => {
        this.generatedToken = value.message.token;
        this.dockerComposeFile = value.message.file;
        this.volumesToConfig = value.message.volumesToConfigure ?? [];
        this.useCaseState = UseCaseState.TokenGenerated;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  getBack() {
    this.useCaseState = this.useCaseState - 1;
  }

  goToPullImage() {
    this.useCaseState = UseCaseState.ImagePull;
  }

  finish() {
    this.useCaseState = UseCaseState.Finished;
  }


}
