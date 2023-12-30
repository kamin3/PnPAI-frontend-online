import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AlertService {

  public showsAlert$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public alertMessage$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor() { }

  showAlert(alertMsg: string): void {
    this.alertMessage$.next(alertMsg);
    this.showsAlert$.next(true);
  }

  dismissAlert(): void {
    this.showsAlert$.next(false);
  }
}
