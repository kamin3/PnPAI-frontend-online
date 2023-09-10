import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { CONFIG } from '@shared/configs';


const routes: Routes = [
  {
    path: '',
    redirectTo: CONFIG.auth.name,
    pathMatch: 'full'
  },
  {
    path: '',
    children: [
      {
        path: CONFIG.auth.children.login.name,
        component: SignInComponent
      },
      {
        path: CONFIG.auth.children.register.name,
        component: RegisterComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
