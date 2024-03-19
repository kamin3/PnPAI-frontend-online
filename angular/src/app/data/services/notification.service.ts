import { Observable, of, map, toArray } from 'rxjs';
import data from '@app/data/json/notification_data.json';
import { Notification } from '../schema/notification';
import { inject, Injectable } from '@angular/core';
import { getToken, Messaging } from '@angular/fire/messaging';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { digocFunctionsResponse } from '@schema/digocFunctionsResponse';
import { DeviceToken } from '@schema/deviceToken';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  headers = {
    'Content-Type': 'application/json'
  };

  messaging: Messaging = inject(Messaging);
  router: Router = inject(Router);

  constructor(private httpclient: HttpClient) {

  }

  private notificationPermitted = 'notificationPermission';
  savePermissionRequest() {
    sessionStorage.setItem(this.notificationPermitted, 'requested');
  }

  getPermissionRequest(): string | null {
    return sessionStorage.getItem(this.notificationPermitted);
  }

  saveMessagingDeviceToken = async () => {
    try {
      navigator.serviceWorker.register('firebase-messaging-sw.js', { type: 'module', scope: '__' }).
        then(serviceWorkerRegistration => {
          getToken(this.messaging, {
            serviceWorkerRegistration,
            vapidKey: environment.firebaseConfig.vapid,
          }).then(
            token => {
              this.registerDeviceToken(token).subscribe(
                {
                  next: (value) => {
                    console.log('response', value);
                  }
                }
              );
            });
        });
    } catch (error) {
      console.error('Unable to get messaging token.', error);
    };
  };

  requestNotificationsPermissions = async () => {
    const permission = await Notification.requestPermission();
    this.savePermissionRequest();
    if (permission === 'granted') {
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

  getAll(page_number: number = 1, page_size: number = 5) {
    let domainURL = "https://faas-fra1-afec6ce7.doserverless.co/api/v1/web/fn-0c047659-5abf-4444-9c03-8ab68910414e/notification_services/get_notifications";
    let params = new HttpParams().set('page_number', page_number).set('page_size', page_size);
    return this.httpclient.get<digocFunctionsResponse<Notification[]>>(
      domainURL,
      {
        headers: this.headers,
        params: params
      }
    );
  }

  readNotification(notificationId: string) {
    let domainURL = "https://faas-fra1-afec6ce7.doserverless.co/api/v1/web/fn-0c047659-5abf-4444-9c03-8ab68910414e/notification_services/read_notification";
    return this.httpclient.put<digocFunctionsResponse<Notification>>(
      domainURL,
      {
        "notificationId": notificationId
      },
      {
        headers: this.headers
      }
    );
  }

  registerDeviceToken(deviceToken: string) {
    let domainURL = "https://faas-fra1-afec6ce7.doserverless.co/api/v1/web/fn-0c047659-5abf-4444-9c03-8ab68910414e/notification_services/register_device_token";
    return this.httpclient.post<digocFunctionsResponse<DeviceToken>>(
      domainURL,
      {
        "deviceToken": deviceToken
      },
      {
        headers: this.headers
      }
    );
  }
}
