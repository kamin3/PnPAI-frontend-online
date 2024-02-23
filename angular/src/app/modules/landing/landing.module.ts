import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { SharedModule } from '@app/shared/shared.module';
import { LandingRoutingModule } from './landing-routing.module';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { FaqComponent } from './pages/faq/faq.component';
import { EcommerceComponent } from './pages/ecommerce/ecommerce.component';
import { PricesComponent } from './pages/landing-page/prices/prices.component';
import { JoinBetaComponent } from './shared/join-beta/join-beta.component';
import { ScheduleDemoComponent } from './shared/schedule-demo/schedule-demo.component';

@NgModule({
  declarations: [LandingPageComponent, PrivacyPolicyComponent, FaqComponent, EcommerceComponent, PricesComponent, JoinBetaComponent, ScheduleDemoComponent],
  imports: [RouterModule, LandingRoutingModule, SharedModule],
})
export class LandingModule { }
