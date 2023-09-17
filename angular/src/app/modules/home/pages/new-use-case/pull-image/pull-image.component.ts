import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pull-image',
  templateUrl: './pull-image.component.html',
  styleUrls: ['./pull-image.component.css']
})
export class PullImageComponent {


  @Input() curlCommand: string = '';
  @Output() getBackEvent = new EventEmitter<null>();
  @Output() finishStepEvent = new EventEmitter<null>();


  constructor() {

  }
  getBack() {
    this.getBackEvent.emit();
  }

  finish() {
    this.finishStepEvent.emit();
  }

}
