import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-pull-image',
  templateUrl: './pull-image.component.html',
  styleUrls: ['./pull-image.component.css']
})
export class PullImageComponent {


  @Input() curlCommand: string = '';
  @Output() getBackEvent = new EventEmitter<null>();
  @Output() finishStepEvent = new EventEmitter<null>();
  @ViewChild('copyBTN') copyBTN!: ElementRef<HTMLButtonElement>;

  constructor() {
  }
  getBack() {
    this.getBackEvent.emit();
  }

  finish() {
    this.finishStepEvent.emit();
  }

  onClipboardCopy(successful: boolean): void {
    if (!successful) return;
    this.copyBTN.nativeElement.innerText = 'Copied';
    this.copyBTN.nativeElement.classList.remove('copy-btn');
    this.copyBTN.nativeElement.classList.add('copied-btn');
    this.copyBTN.nativeElement.disabled = true;
  }
}
