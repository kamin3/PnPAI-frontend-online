import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AccountService } from '@app/data/services/account.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-token-generation',
  templateUrl: './token-generation.component.html',
  styleUrls: ['./token-generation.component.css', '../new-use-case.component.css']
})
export class TokenGenerationComponent implements OnInit {

  @Input() token: string = '';
  @Output() getBackEvent = new EventEmitter<null>();
  @Output() nextStepEvent = new EventEmitter<null>();
  robotName: string = '';
  loginCommand: string = 'docker login quay.io';
  constructor(
    private translate: TranslateService,
    private accountService: AccountService
  ) {
  }
  ngOnInit(): void {
    this.robotName = this.accountService.getUserRobotName();
  }
  getBack() {
    this.getBackEvent.emit();
  }

  goNextStep() {
    this.nextStepEvent.emit();
  }

  onClipboardCopy(successful: boolean, copyButton: HTMLButtonElement): void {
    if (!successful) return;
    let copiedText = this.translate.instant('Buttons.Copied');
    copyButton.innerText = copiedText;
    copyButton.classList.remove('copy-btn');
    copyButton.classList.add('copied-btn');
    copyButton.disabled = true;
  }



}
