import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { filter } from 'rxjs';

import { CONFIG } from '@app/shared/configs';
import { ToggleSidebarService } from '@app/shared/services/toggleSidebar.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {


  showMobileSidebar: boolean = false;

  @Output() toggleSideBarEvent = new EventEmitter<null>();

  navItems = [
    { link: CONFIG.home.children.dashboard.route, title: 'Dashboard', iconClass: "fi fi-shape-squared-unequal" },
    { link: CONFIG.home.children.org.route, title: 'Org.', iconClass: "fi fi-squared-graph" },
    { link: CONFIG.home.children.teams.route, title: 'Teams', iconClass: "fi fi-shape-3dots" },
    { link: CONFIG.home.children.usecases.route, title: 'Use Cases', iconClass: "fi fi-shape-3dots" },
    {
      title: 'Support Center', iconClass: "fi fi-support-headphones",
      children: [
        { link: CONFIG.home.children.support.children.overview.route, title: 'Overview' },
        { link: CONFIG.home.children.support.children.tickets.route, title: 'Tickets' },
        { link: CONFIG.home.children.support.children.tutorial.route, title: 'Tutorial' },
        { link: CONFIG.home.children.support.children.faq.route, title: 'FAQ' },
        { link: CONFIG.home.children.support.children.license.route, title: 'License' },
        { link: CONFIG.home.children.support.children.contactus.route, title: 'Contact us' },
      ]
    },
  ];

  constructor(private toggleSidebarService: ToggleSidebarService, private router: Router) { }

  ngOnInit() {
    this.toggleSidebarService.getMobileFlag().subscribe((flag: boolean) => {
      this.showMobileSidebar = flag;
    });

    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((route) => {
      console.log(route);
    });
  }

  toggleSidebar() {
    this.toggleSideBarEvent.emit();
  }
}
