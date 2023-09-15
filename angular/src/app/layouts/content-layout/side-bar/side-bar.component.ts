import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { CONFIG } from '@app/shared/configs';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  navItems = [
    { link: CONFIG.dashboard.children.home.route, title: CONFIG.dashboard.children.home.name },
    { link: CONFIG.about.route, title: CONFIG.about.name },
    { link: '/contact', title: 'Contact' }
  ];

  constructor() {}

  ngOnInit() {
    
  }
}
