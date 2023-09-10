import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { CONFIG } from '@app/shared/configs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  navItems = [
    { link: CONFIG.dashboard.children.home.route, title: CONFIG.dashboard.children.home.name },
    { link: CONFIG.about.route, title: CONFIG.about.name },
    { link: '/contact', title: 'Contact' }
  ];

  constructor() {}

  ngOnInit() {
    
  }
}
