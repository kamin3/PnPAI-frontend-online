import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CONFIG } from '@shared/configs';
import { NewUseCaseComponent } from './pages/new-use-case/new-use-case.component';
import { TeamsComponent } from './pages/teams/teams.component';
import { CurrentUseCasesComponent } from './pages/current-use-cases/current-use-cases.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: CONFIG.dashboard.children.dashboard.route,
    pathMatch: 'full'
  },
  {
    path: CONFIG.dashboard.children.dashboard.name,
    component: HomeComponent
  },
  {
    path: CONFIG.dashboard.children.teams.name,
    component: TeamsComponent
  },
  {
    path: CONFIG.dashboard.children.newUseCase.name,
    component: NewUseCaseComponent
  },
  {
    path: CONFIG.dashboard.children.usecases.name,
    component: CurrentUseCasesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
