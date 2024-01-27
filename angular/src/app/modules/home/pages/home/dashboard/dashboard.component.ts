import { Component } from '@angular/core';
import { CONFIG } from '@app/shared/configs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  newUseCaseRoute: string = CONFIG.dashboard.children.newUseCase.route;

  constructor() {

  }

}
