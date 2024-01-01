import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { CONFIG } from '@shared/configs';
import { authGuard } from '@app/shared/services/auth.guard';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { FaqComponent } from './pages/faq/faq.component';

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
    path: CONFIG.landing.children.privacypolicy.name,
    component: PrivacyPolicyComponent,
  },
  {
    path: CONFIG.landing.children.faq.name,
    component: FaqComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LandingRoutingModule { }
