import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { CONFIG } from '@shared/configs';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { FaqComponent } from './pages/faq/faq.component';
import { EcommerceComponent } from './pages/ecommerce/ecommerce.component';

const routes: Routes = [
  {
    path: '',
    children: [
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
      {
        path: CONFIG.landing.children.ecommerce.name,
        component: EcommerceComponent,
      }
    ]
  },
  {
    path: '**',
    redirectTo: CONFIG.landing.children.landing.route,
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LandingRoutingModule { }
