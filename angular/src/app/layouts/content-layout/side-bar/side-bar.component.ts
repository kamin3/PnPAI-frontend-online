import { AfterViewInit, Component, ElementRef, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { filter } from 'rxjs';

import { CONFIG } from '@app/shared/configs';
import { ToggleSidebarService } from '@app/shared/services/toggleSidebar.service';
import { NavigationEnd, Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css', '../content-layout.component.css']
})
export class SideBarComponent implements OnInit, AfterViewInit {


  showMobileSidebar: boolean = false;

  @Output() toggleSideBarEvent = new EventEmitter<null>();

  navItems = [
    { link: CONFIG.dashboard.children.dashboard.route, title: 'Dashboard', iconClass: "fi fi-shape-squared-unequal", comingSoon: false },
    { link: CONFIG.dashboard.children.org.route, title: 'Org.', iconClass: "fi fi-squared-graph", comingSoon: true },
    { link: CONFIG.dashboard.children.teams.route, title: 'Teams', iconClass: "fi fi-shape-3dots", comingSoon: true },
    // { link: CONFIG.dashboard.children.usecases.route, title: 'Use Cases', iconClass: "fi fi-shape-3dots" },
    {
      title: 'Support Center', iconClass: "fi fi-support-headphones",
      children: [
        { link: CONFIG.dashboard.children.support.children.overview.route, title: 'Overview', comingSoon: true },
        { link: CONFIG.dashboard.children.support.children.tickets.route, title: 'Tickets', comingSoon: false },
        { link: CONFIG.dashboard.children.support.children.tutorial.route, title: 'Tutorial', comingSoon: true },
        { link: CONFIG.dashboard.children.support.children.faq.route, title: 'FAQ', comingSoon: true },
        { link: CONFIG.dashboard.children.support.children.license.route, title: 'License', comingSoon: true },
        { link: CONFIG.dashboard.children.support.children.contactus.route, title: 'Contact us', comingSoon: false },
      ]
    },
  ];

  constructor(
    private toggleSidebarService: ToggleSidebarService,
    private router: Router,
    private elRef: ElementRef,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit() {
    this.toggleSidebarService.getMobileFlag().subscribe((flag: boolean) => {
      this.showMobileSidebar = flag;
    });
  }

  ngAfterViewInit(): void {
    this.setIsActive(this.router.url);
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((route) => {
      this.setIsActive(this.router.url);
    });
  }

  setIsActive(route: string) {
    let fullRoute = this.document.location.origin + route;
    let elements = this.elRef.nativeElement.querySelectorAll("a.nav-link");
    for (let elem of elements) {
      if (elem.href == fullRoute) {
        this.addIsActive(elem);
      }
      else {
        this.removeIsActive(elem);
      }
    }

  }

  addIsActive(element: any) {
    if (element.classList.contains('sub-link')) {
      element.classList.add('active');
      return;
    }
    element.parentElement.classList.add('active');
  }

  removeIsActive(element: any) {
    if (element.classList.contains('sub-link')) {
      element.classList.remove('active');
      return;
    }
    element.parentElement.classList.remove('active');
  }


  toggleSidebar() {
    this.toggleSideBarEvent.emit();
  }
}
