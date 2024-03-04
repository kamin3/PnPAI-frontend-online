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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LandingLayoutComponent } from './layouts/landing-layout/landing-layout.component';
import { HeaderComponent } from './layouts/landing-layout/header/header.component';
import { FooterComponent } from './layouts/landing-layout/footer/footer.component';
import { SendNotificationsComponent } from './modules/send-notifications/send-notifications.component';
import { environment } from 'src/environments/environment';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideMessaging, getMessaging } from '@angular/fire/messaging';

@NgModule({
  declarations: [
    AppComponent,
    AuthLayoutComponent,
    ContentLayoutComponent,
    SideBarComponent,
    NavBarComponent,
    NotificationsComponent,
    LandingLayoutComponent,
    HeaderComponent,
    FooterComponent,
    SendNotificationsComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    SharedModule,
    AppRoutingModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideMessaging(() => {
      return getMessaging();
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
