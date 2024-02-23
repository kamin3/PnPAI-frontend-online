import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Industry } from '@app/data/schema/industry';
import { JoinUsInput } from '@app/data/schema/joinusInput';
import { IndustryService } from '@app/data/services/industry.service';
import { JoinUsService } from '@app/data/services/joinus.service';
import { AlertService } from '@app/shared/services/alert.service';
import { HttpErrorHandler } from '@app/shared/services/httpErrorHandler.service';
import { ValidateBusinessEmail } from '@app/shared/validators/businessEmail.validator';

@Component({
  selector: 'app-join-beta',
  templateUrl: './join-beta.component.html',
  styleUrls: ['./join-beta.component.css']
})
export class JoinBetaComponent {

  @Input() anchorClass: string = '';
  industries: Industry[] = [];
  joinBetaForm: FormGroup | undefined;
  @ViewChild('closeJoinBetaBTN') closeJoinBetaBTN!: ElementRef<HTMLButtonElement>;
  constructor(
    private fb: FormBuilder,
    private indusrtyService: IndustryService,
    private joinusService: JoinUsService,
    private alertService: AlertService,
    private httpErrorHandler: HttpErrorHandler
  ) { }

  ngOnInit(): void {
    this.joinBetaForm = this.fb.group({
      fullName: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email, ValidateBusinessEmail]],
      industryId: [""],
      title: [""],
      companyName: [""],
      phoneNumber: ["", [Validators.pattern(/^(00|\+)\d+$/)]],
    });
    this.getIndustries();
  }

  getIndustries() {
    this.indusrtyService.getAll().subscribe({
      next: (value) => {
        this.industries = value.message;
      },
      error: (err) => {
        this.httpErrorHandler.handleError(err);
      },
    });
  }

  setAllTouched(form: FormGroup) {
    Object.keys(form!.controls).forEach(controlName => {
      if (form!.get(controlName)!.untouched)
        form!.get(controlName)!.markAsTouched();
    });
  }

  onJoinBetaSubmit() {
    let industryName = this.industries.find(i => i.id == this.joinBetaForm?.value.industryId)?.name;
    let input: JoinUsInput = {
      "participant_name": this.joinBetaForm?.value.fullName,
      "participant_email": this.joinBetaForm?.value.email,
      "phone": this.joinBetaForm?.value.phoneNumber ? this.joinBetaForm?.value.phoneNumber : null,
      "company": this.joinBetaForm?.value.companyName ? this.joinBetaForm?.value.companyName : null,
      "role": this.joinBetaForm?.value.title ? this.joinBetaForm?.value.title : null,
      "industry": industryName,
    };

    this.joinusService.sendJoinUsEmail(input).subscribe({
      next: (value) => {
        this.closeJoinBetaBTN.nativeElement.click();
        this.alertService.showSuccessAlert("Email sent successfully");
        this.joinBetaForm?.reset();
      },
      error: (err) => {
        if (err.status == 400) {
          this.closeJoinBetaBTN.nativeElement.click();
          this.alertService.showFailureAlert("Request is already sent before");
          this.joinBetaForm?.reset();
          return;
        }
        this.httpErrorHandler.handleError(err);
      },
    });
  }

}
