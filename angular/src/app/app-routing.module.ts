import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CONFIG } from '@shared/configs';
import { ContentLayoutComponent } from '@layouts/content-layout/content-layout.component';
import { AuthLayoutComponent } from '@layouts/auth-layout/auth-layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: CONFIG.auth.children.login.route,
    pathMatch: 'full'
  },
  {
    path :'',
    component: ContentLayoutComponent,
    children: [
      {
        path: CONFIG.home.name,
        loadChildren: () => import ('@modules/home/home.module').then(m => m.HomeModule)
      }
    ]
  },
  {
    path: CONFIG.auth.name,
    component: AuthLayoutComponent,
    loadChildren: () =>
      import('@modules/auth/auth.module').then(m => m.AuthModule)
  },
  { path: '**', redirectTo: CONFIG.auth.children.login.route, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
