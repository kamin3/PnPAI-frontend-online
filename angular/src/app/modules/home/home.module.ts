import { NgModule } from '@angular/core';
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
import { SharedModule } from '@app/shared/shared.module';
import { CurrentUseCasesComponent } from './pages/current-use-cases/current-use-cases.component';
import { ImagesVersionsComponent } from './pages/new-use-case/images-versions/images-versions.component';
import { ImageConnectorsComponent } from './pages/new-use-case/image-connectors/image-connectors.component';
import { contactUsComponent } from './pages/contactus/contactUs.component';


@NgModule({
  declarations: [
    HomeComponent,
    UseCasesComponent,
    DashboardComponent,
    TokenGenerationComponent,
    PullImageComponent,
    UseCaseResultComponent,
    NewUseCaseComponent,
    TeamsComponent,
    CurrentUseCasesComponent,
    ImagesVersionsComponent,
    ImageConnectorsComponent,
    contactUsComponent
  ],
  imports: [
    RouterModule,
    HomeRoutingModule,
    SharedModule
  ]
})
export class HomeModule { }
