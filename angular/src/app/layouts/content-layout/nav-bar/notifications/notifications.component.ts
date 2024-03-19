import { Component, OnInit } from '@angular/core';
import { NotificationService } from '@app/data/services/notification.service';
import { Notification, NotificationState } from '@app/data/schema/notification';
import { HttpErrorHandler } from '@app/shared/services/httpErrorHandler.service';
import { digocFunctionsResponse } from '@schema/digocFunctionsResponse';
import { Messaging, onMessage } from '@angular/fire/messaging';
import { AlertService } from '@app/shared/services/alert.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css', '../nav-bar.component.css']
})
export class NotificationsComponent implements OnInit {

  notifications: Notification[] = [];
  newNotificationsLength: number = 0;
  containNew: boolean = false;

  constructor(
    private notificationService: NotificationService,
    private httpErrorHandler: HttpErrorHandler,
    private messaging: Messaging,
    private alertService: AlertService
  ) {
  }
  ngOnInit(): void {

    if (!this.notificationService.getPermissionRequest()) {
      this.notificationService.requestNotificationsPermissions().then((data) => {
        console.log(data);
      }).catch((err) => {
        console.log(err);
      });
    }

    onMessage(this.messaging, (message) => {
      const notificationData: unknown = message.data;
      const notification = notificationData as Notification;
      notification.isRead = false;
      notification.state = notification.state in [0, "0"] ? NotificationState.Success : NotificationState.Error;
      this.alertService.showSuccessAlert(notification.message);
      this.notifications.unshift(notification);
      this.setNewNotifications();
    });




    this.notificationService.getAll().subscribe({
      next: (value: digocFunctionsResponse<Notification[]>) => {
        let notifications = value.message.map(item => {
          item.link = '#';
          return item;
        });
        this.notifications.push(...notifications);
        this.setNewNotifications();
      },
      error: (err) => {
        this.httpErrorHandler.handleError(err);
      },
    });
  }

  setNewNotifications() {
    this.newNotificationsLength = this.notifications.filter(n => !n.isRead).length;
    this.containNew = this.newNotificationsLength > 0;
  }


  readNotification(notificationId: string) {
    this.notificationService.readNotification(notificationId).subscribe({
      next: (value: digocFunctionsResponse<Notification>) => {
        this.notifications.find(n => n.id == notificationId)!.isRead = value.message.isRead;
        this.setNewNotifications();
      },
      error: (err) => {
        this.httpErrorHandler.handleError(err);
      },
    });
  }

}
