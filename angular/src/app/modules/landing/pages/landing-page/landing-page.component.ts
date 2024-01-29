import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Industry } from '@app/data/schema/industry';
import { Plan, PlanRepresent } from '@app/data/schema/plan';
import { AccountService } from '@app/data/services/account.service';
import { IndustryService } from '@app/data/services/industry.service';
import { PlansService } from '@app/data/services/plans.service';
import { CONFIG } from '@app/shared/configs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidateBusinessEmail } from '@app/shared/validators/businessEmail.validator';
import { ContactUsInput } from '@app/data/schema/contactusInput';
import { ContactUsService } from '@app/data/services/contactus.service';
import { AlertService } from '@app/shared/services/alert.service';
import { JoinUsService } from '@app/data/services/joinus.service';
import { JoinUsInput } from '@app/data/schema/joinusInput';
import { ScheduleDemoService } from '@app/data/services/scheduleDemo.service';
import { ScheduleDemoInput } from '@app/data/schema/scheduleDemoInput';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent implements OnInit {

  plansData: Plan[] = [];
  plans: PlanRepresent[] = [];
  plansStyles = [
    {
      order: 1,
      title_class: 'bg-danger',
      title_icon: './assets/img/price-starter-icon.svg',
      number_class: 'text-danger',
      annual_icon: './assets/img/price-annual-icon.svg',
      quarter_icon: './assets/img/price-quarter-icon.svg',
      trial_class: 'text-danger',
      trial_bg_color: '#ffeff0',
      feature_icon_class: 'starter-check-icon',
      button_class: 'starter-price-button bg-danger',
    },
    {
      order: 2,
      title_class: 'bg-primary',
      title_icon: './assets/img/price-growth-icon.svg',
      number_class: 'text-primary',
      annual_icon: './assets/img/price-growth-annual-icon.svg',
      quarter_icon: './assets/img/price-growth-quarter-icon.svg',
      trial_class: 'text-primary',
      trial_bg_color: 'rgb(245, 246, 255)',
      feature_icon_class: 'growth-check-icon',
      button_class: 'growth-price-button bg-primary',
    },
    {
      order: 3,
      title_class: 'enterprise_bg',
      title_icon: './assets/img/price-enter-icon.svg',
      number_class: 'enter-darkblue-p',
      annual_icon: './assets/img/price-enter-annual-icon.svg',
      quarter_icon: './assets/img/price-enter-quarter-icon.svg',
      trial_class: 'enter-darkblue-p',
      trial_bg_color: '#d5deff',
      feature_icon_class: 'enter-check-icon',
      button_class: 'enter-price-button',
    },
  ];
  isUserLoggedIn: boolean = false;
  loginRoute = CONFIG.auth.children.login.route;
  registerRoute = CONFIG.auth.children.register.route;
  landingRoute = CONFIG.landing.children.landing.route;
  dashboardRoute = CONFIG.dashboard.children.dashboard.route;
  currentUrl = window.location.href;
  @ViewChild('guestWarning')
  showGuestWarningModalBTN!: ElementRef<HTMLButtonElement>;
  industries: Industry[] = [];
  monthlyPlanChecked: boolean = false;
  contactusForm: FormGroup | undefined;
  joinBetaForm: FormGroup | undefined;
  scheduleDemoForm: FormGroup | undefined;
  failedJoinedBetaMessage: string | undefined;


  constructor(
    private planService: PlansService,
    private fb: FormBuilder,
    private accountService: AccountService,
    private indusrtyService: IndustryService,
    private contactusService: ContactUsService,
    private joinusService: JoinUsService,
    private scheduleDemoService: ScheduleDemoService,
    private alertService: AlertService,
    private router: Router
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
    this.isUserLoggedIn = this.accountService.isLoggedIn();
    this.getIndustries();
    this.getAllPlans();
    this.loadChargebeeScript();
  }

  private getAllPlans() {
    this.planService.getAll().subscribe({
      next: (value) => {
        this.plansData = value.message;
        this.plans = this.mapPlans(this.plansData);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  private mapPlans(plansData: Plan[]): PlanRepresent[] {
    plansData = plansData.sort((o1, o2) => o1.order - o2.order);

    for (const plan of plansData) {
      let monthly_price = plan.prices.find(
        (p) => p.period_unit == 'month' && p.period == 1
      );
      let quarter_price = plan.prices.find(
        (p) => p.period_unit == 'month' && p.period == 3
      );
      let annual_price = plan.prices.find(
        (p) => p.period_unit == 'year' && p.period == 1
      );

      let new_plan: PlanRepresent = {
        id: plan.id,
        name: plan.external_name,
        features: plan.description.trim().split('\n'),
        order: plan.order,
        monthly_price: monthly_price!.price / 100,
        quarter_price: quarter_price ? quarter_price.price / 100 : quarter_price,
        quarter_discount: quarter_price ? Math.floor(quarter_price.discount * 100) : quarter_price,
        annual_price: annual_price!.price / 100,
        annual_discount: Math.floor(annual_price!.discount * 100),
        monthly_price_annual_plan: +(annual_price!.price / (100 * 12)).toFixed(2),
        has_trial: monthly_price!.trial_period > 0,
        trial_period: monthly_price!.trial_period,
        trial_period_unit: monthly_price!.trial_period_unit,
      };

      this.plans.push(new_plan);
    }

    return this.plans;
  }

  getIndustries() {
    this.indusrtyService.getAll().subscribe({
      next: (value) => {
        this.industries = value.message;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onPlanPeriodChange(event: Event) {
    const ischecked = (<HTMLInputElement>event.target).checked;
    this.monthlyPlanChecked = !ischecked;
  }

  buyPlan(plan_id: string) {
    if (!this.isUserLoggedIn) {
      this.showGuestWarningModalBTN.nativeElement.click();
      return;
    }
    let requested_plan = this.plansData.find(p => p.id == plan_id);
    let periodUnit = this.monthlyPlanChecked ? 'month' : 'year';
    let price = requested_plan?.prices.find(
      (p) => p.period_unit == periodUnit && p.period == 1
    )!;
    this.checkout(price.id);
  }

  private checkout(monthly_price_id: string) {
    // @ts-ignore
    const cbInstance = window['Chargebee'].getInstance();
    cbInstance.openCheckout({
      hostedPage: () => {
        return new Promise((resolve, reject) => {
          this.planService.checkout(monthly_price_id).subscribe({
            next: (value) => {
              resolve(value.message);
            },
            error: (err) => {
              console.log("errrrroooooooooooor");
              console.log(err);
            },
          });
        });
      },
      loaded: () => {
        console.log("checkout opened");
      },
      error: (err: any) => {
        console.log("err");
        console.log(err);

      },
      close: () => {
        console.log("checkout closed");
      },
      success: (hostedPageId: string) => {
        console.log('hosted page success', hostedPageId);
        this.router.navigateByUrl(this.dashboardRoute);
      },
      step: (value: any) => {
        // value -> which step in checkout
        console.log(value);
      }
    });
    // this.planService.checkout(monthly_price_id).subscribe({
    //   next: (value) => {
    //     let url = value.message.url;
    //     window.open(url, "_blank");
    //   },
    //   error: (err) => {
    //     console.log(err);
    //   },
    // });
  }

  private loadChargebeeScript() {
    let body = <HTMLDivElement>document.body;
    let script = document.createElement('script');
    script.onload = this.initChargebee;
    script.src = 'https://js.chargebee.com/v2/chargebee.js';
    body.appendChild(script);
  }

  private initChargebee() {
    // @ts-ignore
    window['Chargebee'].init({
      site: 'pnpai-service-test'
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
        this.alertService.showFailureAlert(err.error.message);
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
        this.alertService.showSuccessAlert("Email sent successfully");
        this.joinBetaForm?.reset();
      },
      error: (err) => {
        if (err.status == 400) {
          this.failedJoinedBetaMessage = "Request is already sent";
          return;
        }
        this.alertService.showFailureAlert(err.error.message);
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
        this.alertService.showSuccessAlert("Email sent successfully");
        this.scheduleDemoForm?.reset();
      },
      error: (err) => {
        this.alertService.showFailureAlert(err.error.message);
      },
    });
  }

}
