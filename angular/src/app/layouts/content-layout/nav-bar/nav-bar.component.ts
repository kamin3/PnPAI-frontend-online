import { Component, Input } from '@angular/core';
import { ToggleSidebarService } from '@app/shared/services/toggleSidebar.service';
ToggleSidebarService;
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css', '../content-layout.component.css']
})
export class NavBarComponent {

  @Input() showSidebar!: boolean;
  @Input() showMobileSidebar: boolean = false;
  constructor(private toggleSidebarService: ToggleSidebarService) {

  }

  toggleSidebar() {
    this.showMobileSidebar = !this.showMobileSidebar;
    this.toggleSidebarService.sendMobileFlag(this.showMobileSidebar);
  }
}
