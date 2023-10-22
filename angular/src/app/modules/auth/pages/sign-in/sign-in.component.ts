import { Component } from '@angular/core';
import { CONFIG } from '@app/shared/configs';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {

  homeRoute = CONFIG.home.route;

}
