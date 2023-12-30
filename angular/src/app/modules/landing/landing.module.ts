import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { SharedModule } from '@app/shared/shared.module';
import { LandingRoutingModule } from './landing-routing.module';
import { CheckoutResultComponent } from './pages/checkout-result/checkout-result.component';
import { HeaderComponent } from './pages/landing-page/header/header.component';
import { FooterComponent } from './pages/landing-page/footer/footer.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { FaqComponent } from './pages/faq/faq.component';

@NgModule({
  declarations: [LandingPageComponent, CheckoutResultComponent, HeaderComponent, FooterComponent, PrivacyPolicyComponent, FaqComponent],
  imports: [RouterModule, LandingRoutingModule, SharedModule],
})
export class LandingModule { }
