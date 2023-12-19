import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthLayoutComponent } from '@layouts/auth-layout/auth-layout.component';
import { ContentLayoutComponent } from '@layouts/content-layout/content-layout.component';
import { SideBarComponent } from '@app/layouts/content-layout/side-bar/side-bar.component';
import { SharedModule } from '@shared/shared.module';
import { NavBarComponent } from './layouts/content-layout/nav-bar/nav-bar.component';
import { NotificationsComponent } from './layouts/content-layout/nav-bar/notifications/notifications.component';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    AuthLayoutComponent,
    ContentLayoutComponent,
    SideBarComponent,
    NavBarComponent,
    NotificationsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
