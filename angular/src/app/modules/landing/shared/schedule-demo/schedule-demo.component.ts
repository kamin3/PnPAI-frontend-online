import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Industry } from '@app/data/schema/industry';
import { ScheduleDemoInput } from '@app/data/schema/scheduleDemoInput';
import { IndustryService } from '@app/data/services/industry.service';
import { ScheduleDemoService } from '@app/data/services/scheduleDemo.service';
import { AlertService } from '@app/shared/services/alert.service';
import { HttpErrorHandler } from '@app/shared/services/httpErrorHandler.service';
import { ValidateBusinessEmail } from '@app/shared/validators/businessEmail.validator';

@Component({
  selector: 'app-schedule-demo',
  templateUrl: './schedule-demo.component.html',
  styleUrls: ['./schedule-demo.component.css']
})
export class ScheduleDemoComponent implements OnInit {

  @Input() anchorClass: string = '';
  industries: Industry[] = [];
  scheduleDemoForm: FormGroup | undefined;
  @ViewChild('closeScheduleDemoBTN') closeScheduleDemoBTN!: ElementRef<HTMLButtonElement>;
  constructor(
    private fb: FormBuilder,
    private indusrtyService: IndustryService,
    private scheduleDemoService: ScheduleDemoService,
    private alertService: AlertService,
    private httpErrorHandler: HttpErrorHandler
  ) { }

  ngOnInit(): void {
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

