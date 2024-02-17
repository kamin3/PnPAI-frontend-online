import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactUsInput } from '@app/data/schema/contactusInput';
import { AccountService } from '@app/data/services/account.service';
import { ContactUsService } from '@app/data/services/contactus.service';
import { AlertService } from '@app/shared/services/alert.service';
import { HttpErrorHandler } from '@app/shared/services/httpErrorHandler.service';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactUs.component.html',
  styleUrls: ['./contactUs.component.css']
})
export class contactUsComponent implements OnInit {

  contactusForm: FormGroup | undefined;


  constructor(
    private fb: FormBuilder,
    private contactUsService: ContactUsService,
    private alertService: AlertService,
    private httpErrorHandler: HttpErrorHandler,
    private accountService: AccountService
  ) {



  }
  ngOnInit(): void {
    this.contactusForm = this.fb.group({
      message: ["", [Validators.required]],
    });
  }

  onContactUsSubmit(): void {

    let input: ContactUsInput = {
      "submitter_email": this.accountService.getUserEmail(),
      "submitter_name": this.accountService.getUserFullname(),
      "phone": undefined,
      "message": this.contactusForm?.value.message,
      "company": this.accountService.getUserOrganizationName(),
      "role": undefined,
      "industry": this.accountService.getUserIndustryName(),
    };
    this.contactUsService.sendContactUsEmail(input).subscribe({
      next: (value) => {
        this.alertService.showSuccessAlert("Email sent successfully");
        this.contactusForm?.reset();
      },
      error: (err) => {
        this.httpErrorHandler.handleError(err);
      },
    });
  };

  setAllTouched(form: FormGroup) {
    Object.keys(form!.controls).forEach(controlName => {
      if (form!.get(controlName)!.untouched)
        form!.get(controlName)!.markAsTouched();
    });
  }
}
