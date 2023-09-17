import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-token-generation',
  templateUrl: './token-generation.component.html',
  styleUrls: ['./token-generation.component.css']
})
export class TokenGenerationComponent {

  @Input() token: string = '';
  @Output() getBackEvent = new EventEmitter<null>();
  @Output() nextStepEvent = new EventEmitter<null>();


  constructor() {

  }
  getBack() {
    this.getBackEvent.emit();
  }

  goNextStep() {
    this.nextStepEvent.emit();
  }



}
