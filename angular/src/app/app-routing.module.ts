import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { CONFIG } from '@shared/configs';
import { ContentLayoutComponent } from '@layouts/content-layout/content-layout.component';
import { AuthLayoutComponent } from '@layouts/auth-layout/auth-layout.component';
import { authGuard } from '@app/shared/services/auth.guard';
import { anonymousGuard } from '@app/shared/services/anonymous.guard';
import { LandingLayoutComponent } from './layouts/landing-layout/landing-layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: CONFIG.landing.children.landing.route,
    pathMatch: 'full',
  },
  {
    path: CONFIG.dashboard.name,
    component: ContentLayoutComponent,
    loadChildren: () =>
      import('@modules/home/home.module').then((m) => m.HomeModule),
    canActivate: [authGuard],
  },
  {
    path: CONFIG.auth.name,
    component: AuthLayoutComponent,
    loadChildren: () =>
      import('@modules/auth/auth.module').then((m) => m.AuthModule),
    canActivate: [anonymousGuard]
  },
  {
    path: CONFIG.landing.name,
    component: LandingLayoutComponent,
    loadChildren: () =>
      import('@modules/landing/landing.module').then((m) => m.LandingModule),
  },
  {
    path: '**',
    redirectTo: CONFIG.landing.children.landing.route,
    pathMatch: 'full',
  }
];

const routerOptions: ExtraOptions = {
  anchorScrolling: 'enabled',
  scrollPositionRestoration: 'top',
  scrollOffset: [0, 50]
};
@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
