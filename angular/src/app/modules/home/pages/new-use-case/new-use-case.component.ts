import { Component } from '@angular/core';
import { DockerConfigVolumes } from '@app/data/schema/docker-config';
import { DockerConfigService } from '@app/data/services/docker-config.service';


enum UseCaseState {
  Select = 1,
  TokenGenerated = 2,
  ImagePull = 3,
  Finished = 4
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
  constructor(private dockerconfigService: DockerConfigService) {
  }

  getSelectedCase(caseValue: string) {
    this.dockerconfigService.getDockerCompose(caseValue).subscribe({
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
