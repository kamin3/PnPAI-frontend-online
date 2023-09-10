import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CONFIG } from '@shared/configs';

const routes: Routes = [
  {
    path: '',
    redirectTo: CONFIG.home.name,
    pathMatch: 'full'
  },
  {
    path: CONFIG.home.name,
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
