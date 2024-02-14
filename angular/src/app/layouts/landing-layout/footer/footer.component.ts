import { Component } from '@angular/core';
import { CONFIG } from '@app/shared/configs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  privacyPolicyRoute = CONFIG.landing.children.privacypolicy.route;
  faqRoute = CONFIG.landing.children.faq.route;
  loginRoute = CONFIG.auth.children.login.route;
  contactUsRoute = CONFIG.landing.children.landing.route + '#contactus';
}
