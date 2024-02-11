import { Component, OnInit } from '@angular/core';
import { NotificationService } from '@app/data/services/notification.service';
import { Notification } from '@app/data/schema/notification';
import { HttpErrorHandler } from '@app/shared/services/httpErrorHandler.service';
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css', '../nav-bar.component.css']
})
export class NotificationsComponent implements OnInit {

  notifications: Notification[] = [];

  containNew: boolean = false;
  constructor(
    private notificationService: NotificationService,
    private httpErrorHandler: HttpErrorHandler
  ) {
  }
  ngOnInit(): void {
    this.notificationService.get().subscribe({
      next: (value: Notification[]) => {
        this.notifications = value.map(item => {
          item.link = '#';
          return item;
        });
        this.containNew = this.notifications.some(item => !item.isRead);
      },
      error: (err) => {
        this.httpErrorHandler.handleError(err);
      },
    });
  }

}
