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
  @ViewChild('copyBTN') copyBTN!: ElementRef<HTMLButtonElement>;
  quayIOLoginGuide: string = "";

  constructor(
    private translate: TranslateService,
    private accountService: AccountService
  ) {
  }
  ngOnInit(): void {
    let robotName = this.accountService.getUserRobotName();
    this.translate.get('NewUsecase.QuayIOLoginGuide').subscribe((value: string) => {
      this.quayIOLoginGuide = value
        .replace("{{robotName}}", robotName)
        .replace("{{token}}", this.token);
    });
  }
  getBack() {
    this.getBackEvent.emit();
  }

  goNextStep() {
    this.nextStepEvent.emit();
  }

  onClipboardCopy(successful: boolean): void {
    if (!successful) return;
    let copiedText = this.translate.instant('Buttons.Copied');
    this.copyBTN.nativeElement.innerText = copiedText;
    this.copyBTN.nativeElement.classList.remove('copy-btn');
    this.copyBTN.nativeElement.classList.add('copied-btn');
    this.copyBTN.nativeElement.disabled = true;
  }



}
