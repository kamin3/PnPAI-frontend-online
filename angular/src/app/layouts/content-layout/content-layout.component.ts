import { Component, OnInit, Renderer2 } from '@angular/core';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-content-layout',
  templateUrl: './content-layout.component.html',
  styleUrls: ['./content-layout.component.css']

})
export class ContentLayoutComponent implements OnInit {

  showSidebar: boolean = true;
  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
  }

  toggleSidebar() {
    this.showSidebar = !this.showSidebar;
    const body = document.querySelector('body');
    if ((body?.classList.contains('sidebar-toggle-display')) || (body?.classList.contains('sidebar-absolute'))) {
      body?.classList.contains('sidebar-hidden') ?
        this.renderer.removeClass(document.body, 'sidebar-hidden') :
        this.renderer.addClass(document.body, 'sidebar-hidden');
    } else {
      body?.classList.contains('sidebar-icon-only') ?
        this.renderer.removeClass(document.body, 'sidebar-icon-only') :
        this.renderer.addClass(document.body, 'sidebar-icon-only');
    }
  }
}
