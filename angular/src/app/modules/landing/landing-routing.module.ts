import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { CONFIG } from '@shared/configs';

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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LandingRoutingModule {}
