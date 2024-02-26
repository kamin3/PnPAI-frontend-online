import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Industry } from '@app/data/schema/industry';
import { IndustryService } from '@app/data/services/industry.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidateBusinessEmail } from '@app/shared/validators/businessEmail.validator';
import { ContactUsInput } from '@app/data/schema/contactusInput';
import { ContactUsService } from '@app/data/services/contactus.service';
import { AlertService } from '@app/shared/services/alert.service';
import { JoinUsService } from '@app/data/services/joinus.service';
import { JoinUsInput } from '@app/data/schema/joinusInput';
import { ScheduleDemoService } from '@app/data/services/scheduleDemo.service';
import { ScheduleDemoInput } from '@app/data/schema/scheduleDemoInput';
import { HttpErrorHandler } from '@app/shared/services/httpErrorHandler.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent implements OnInit {

  industries: Industry[] = [];
  contactusForm: FormGroup | undefined;
  joinBetaForm: FormGroup | undefined;
  scheduleDemoForm: FormGroup | undefined;
  @ViewChild('closeJoinBetaBTN') closeJoinBetaBTN!: ElementRef<HTMLButtonElement>;
  @ViewChild('closeScheduleDemoBTN') closeScheduleDemoBTN!: ElementRef<HTMLButtonElement>;


  constructor(
    private fb: FormBuilder,
    private indusrtyService: IndustryService,
    private contactusService: ContactUsService,
    private joinusService: JoinUsService,
    private scheduleDemoService: ScheduleDemoService,
    private alertService: AlertService,
    private httpErrorHandler: HttpErrorHandler

  ) { }

  ngOnInit(): void {
    this.contactusForm = this.fb.group({
      companyName: [""],
      role: [""],
      message: ["", [Validators.required]],
      name: ["", [Validators.required]],
      industryId: [""],
      phoneNumber: ["", [Validators.pattern(/^(00|\+)\d+$/)]],
      email: ["", [Validators.required, Validators.email, ValidateBusinessEmail]]
    });
    this.joinBetaForm = this.fb.group({
      fullName: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email, ValidateBusinessEmail]],
      industryId: [""],
      title: [""],
      companyName: [""],
      phoneNumber: ["", [Validators.pattern(/^(00|\+)\d+$/)]],
    });
    this.scheduleDemoForm = this.fb.group({
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

  onContactUsSubmit() {

    let industryName = this.industries.find(i => i.id == this.contactusForm?.value.industryId)?.name;
    let input: ContactUsInput = {
      "submitter_email": this.contactusForm?.value.email,
      "submitter_name": this.contactusForm?.value.name,
      "phone": this.contactusForm?.value.phoneNumber ? this.contactusForm?.value.phoneNumber : null,
      "message": this.contactusForm?.value.message,
      "company": this.contactusForm?.value.companyName ? this.contactusForm?.value.companyName : null,
      "role": this.contactusForm?.value.role ? this.contactusForm?.value.role : null,
      "industry": industryName,
    };

    this.contactusService.sendContactUsEmail(input).subscribe({
      next: (value) => {
        this.alertService.showSuccessAlert("Email sent successfully");
        this.contactusForm?.reset();
      },
      error: (err) => {
        this.httpErrorHandler.handleError(err);
      },
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
  onScheduleDemoSubmit() {
    let industryName = this.industries.find(i => i.id == this.scheduleDemoForm?.value.industryId)?.name;
    let input: ScheduleDemoInput = {
      "participant_name": this.scheduleDemoForm?.value.fullName,
      "participant_email": this.scheduleDemoForm?.value.email,
      "phone": this.scheduleDemoForm?.value.phoneNumber ? this.scheduleDemoForm?.value.phoneNumber : null,
      "company": this.scheduleDemoForm?.value.companyName ? this.scheduleDemoForm?.value.companyName : null,
      "role": this.scheduleDemoForm?.value.title ? this.scheduleDemoForm?.value.title : null,
      "industry": industryName,
    };

    this.scheduleDemoService.ScheduleDemo(input).subscribe({
      next: (value) => {
        this.closeScheduleDemoBTN.nativeElement.click();
        this.alertService.showSuccessAlert("Email sent successfully");
        this.scheduleDemoForm?.reset();
      },
      error: (err) => {
        this.httpErrorHandler.handleError(err);
      },
    });
  }

}
