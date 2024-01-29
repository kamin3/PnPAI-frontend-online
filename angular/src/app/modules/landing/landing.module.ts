import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { SharedModule } from '@app/shared/shared.module';
import { LandingRoutingModule } from './landing-routing.module';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { FaqComponent } from './pages/faq/faq.component';
import { EcommerceComponent } from './pages/ecommerce/ecommerce.component';

@NgModule({
  declarations: [LandingPageComponent, PrivacyPolicyComponent, FaqComponent, EcommerceComponent],
  imports: [RouterModule, LandingRoutingModule, SharedModule],
})
export class LandingModule { }
