import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Plan, PlanRepresent } from '@app/data/schema/plan';
import { AccountService } from '@app/data/services/account.service';
import { PlansService } from '@app/data/services/plans.service';
import { CONFIG } from '@app/shared/configs';
import { HttpErrorHandler } from '@app/shared/services/httpErrorHandler.service';

@Component({
  selector: 'app-prices',
  templateUrl: './prices.component.html',
  styleUrls: ['./prices.component.css']
})
export class PricesComponent implements OnInit {


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
  loginRoute = CONFIG.auth.children.login.route;
  registerRoute = CONFIG.auth.children.register.route;
  landingRoute = CONFIG.landing.children.landing.route;
  dashboardRoute = CONFIG.dashboard.children.dashboard.route;
  @ViewChild('guestWarning')
  showGuestWarningModalBTN!: ElementRef<HTMLButtonElement>;
  monthlyPlanChecked: boolean = false;
  isUserLoggedIn: boolean = false;

  constructor(
    private planService: PlansService,
    private router: Router,
    private accountService: AccountService,
    private httpErrorHandler: HttpErrorHandler

  ) {
    this.isUserLoggedIn = this.accountService.isLoggedIn();
  }
  ngOnInit(): void {
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
        this.httpErrorHandler.handleError(err);
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
              this.httpErrorHandler.handleError(err);
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

}
