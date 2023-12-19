import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { SharedModule } from '@app/shared/shared.module';
import { LandingRoutingModule } from './landing-routing.module';
import { CheckoutResultComponent } from './pages/checkout-result/checkout-result.component';

@NgModule({
  declarations: [LandingPageComponent, CheckoutResultComponent],
  imports: [CommonModule, RouterModule, LandingRoutingModule, SharedModule],
})
export class LandingModule { }
