import { Component } from '@angular/core';


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
  curlCommand: string = '';
  constructor() {

  }

  getSelectedCase(caseValue: number) {
    this.generatedToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdW';
    this.useCaseState = UseCaseState.TokenGenerated;
  }

  getBack() {
    this.useCaseState = this.useCaseState - 1;
  }

  goToPullImage() {
    this.curlCommand = `curl -X POST \\-H "Content-Type: application/json" \\-d '{"key": "value"}' \\https://example.com/api/endpoint`;
    this.useCaseState = UseCaseState.ImagePull;
  }

  finish() {
    this.useCaseState = UseCaseState.Finished;
  }


}
