import { Component } from '@angular/core';
import { CONFIG } from '@app/shared/configs';

@Component({
  selector: 'app-use-case-result',
  templateUrl: './use-case-result.component.html',
  styleUrls: ['./use-case-result.component.css', '../new-use-case.component.css']
})
export class UseCaseResultComponent {


  dashboardRoute = CONFIG.home.children.dashboard.route;
  constructor() {

  }
}
