import { Observable, of, map, toArray } from 'rxjs';
import data from '@app/data/json/notification_data.json';
import { Notification } from '../schema/notification';
import { inject, Injectable } from '@angular/core';
import { getToken, Messaging, onMessage } from '@angular/fire/messaging';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  messaging: Messaging = inject(Messaging);
  router: Router = inject(Router);

  saveMessagingDeviceToken = async () => {
    try {
      navigator.serviceWorker.register('firebase-messaging-sw.js', { type: 'module', scope: '__' }).
        then(serviceWorkerRegistration => {
          console.log("here");
          getToken(this.messaging, {
            serviceWorkerRegistration,
            vapidKey: environment.firebaseConfig.vapid,
          }).then(
            token => console.log('FCM', { token }));
        });
      // const currentToken = await getToken(this.messaging);
      // if (currentToken) {
      //   console.log('Got FCM device token:', currentToken);
      // }
      onMessage(this.messaging, (message) => {
        console.log(message);
        console.log("message");
        console.log(
          'New foreground notification from Firebase Messaging!',
          message.notification
        );
      });
      // } else {
      //   this.requestNotificationsPermissions();
      // }
    } catch (error) {
      console.error('Unable to get messaging token.', error);
    };
  };

  requestNotificationsPermissions = async () => {
    console.log('Requesting notifications permission...');
    const permission = await Notification.requestPermission();

    if (permission === 'granted') {
      console.log('Notification permission granted.');
      // Notification permission granted.
      await this.saveMessagingDeviceToken();
    } else {
      console.log('Unable to get permission to notify.');
    }
  };

  get(): Observable<Notification[]> {
    return of(...data.Notifications).pipe(
      map((item: any) => ({
        message: item.message,
        state: item.state,
        isRead: item.isread,
        date: new Date(item.date),
      } as Notification))
      , toArray()
    );
  }
}
