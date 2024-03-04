import { Component, OnInit } from '@angular/core';
import { NotificationService } from '@app/data/services/notification.service';

@Component({
  selector: 'app-send-notifications',
  templateUrl: './send-notifications.component.html',
  styleUrls: ['./send-notifications.component.css']
})
export class SendNotificationsComponent implements OnInit {
  message = '';

  constructor(
    private notificationService: NotificationService,
  ) {
  }
  ngOnInit(): void {

  }


  saveFCMToken() {
    this.notificationService.requestNotificationsPermissions().then((data) => {
      console.log(data);
    }).catch((err) => {
      console.log(err);
    });
  }




}
