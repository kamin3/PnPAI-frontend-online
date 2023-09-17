import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { UseCasesComponent } from './pages/new-use-case/use-cases/use-cases.component';
import { DashboardComponent } from './pages/home/dashboard/dashboard.component';
import { TokenGenerationComponent } from './pages/new-use-case/token-generation/token-generation.component';
import { PullImageComponent } from './pages/new-use-case/pull-image/pull-image.component';
import { UseCaseResultComponent } from './pages/new-use-case/use-case-result/use-case-result.component';
import { NewUseCaseComponent } from './pages/new-use-case/new-use-case.component';
import { TeamsComponent } from './pages/teams/teams.component';


@NgModule({
  declarations: [
    HomeComponent,
    UseCasesComponent,
    DashboardComponent,
    TokenGenerationComponent,
    PullImageComponent,
    UseCaseResultComponent,
    NewUseCaseComponent,
    TeamsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
