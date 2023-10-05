import { Observable, of, pipe, map, toArray } from 'rxjs';
import data from '@app/data/json/notification_data.json';
import { Injectable } from '@angular/core';
import { Notification } from '../schema/notification';
@Injectable({
  providedIn: 'root'
})
export class NotificationService {
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
