import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { CONFIG } from '@shared/configs';
import { CheckoutResultComponent } from './pages/checkout-result/checkout-result.component';
import { authGuard } from '@app/shared/services/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: CONFIG.landing.children.landing.route,
    pathMatch: 'full',
  },
  {
    path: CONFIG.landing.children.landing.name,
    component: LandingPageComponent,
  },
  {
    path: CONFIG.landing.children.checkoutresult.name,
    component: CheckoutResultComponent,
    canActivate: [authGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LandingRoutingModule { }
