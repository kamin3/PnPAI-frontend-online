import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-token-generation',
  templateUrl: './token-generation.component.html',
  styleUrls: ['./token-generation.component.css']
})
export class TokenGenerationComponent {

  @Input() token: string = '';
  @Output() getBackEvent = new EventEmitter<null>();
  @Output() nextStepEvent = new EventEmitter<null>();
  @ViewChild('copyBTN') copyBTN!: ElementRef<HTMLButtonElement>;

  constructor() {

  }
  getBack() {
    this.getBackEvent.emit();
  }

  goNextStep() {
    this.nextStepEvent.emit();
  }

  onClipboardCopy(successful: boolean): void {
    if (!successful) return;
    this.copyBTN.nativeElement.innerText = 'Copied';
    this.copyBTN.nativeElement.classList.remove('copy-btn');
    this.copyBTN.nativeElement.classList.add('copied-btn');
    this.copyBTN.nativeElement.disabled = true;
  }



}
