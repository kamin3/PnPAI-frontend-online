import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AlertService {

  public showsAlert$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public alertMessage$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public isSuccess: boolean = false;

  constructor() { }

  showFailureAlert(alertMsg: string): void {
    this.alertMessage$.next(alertMsg);
    this.showsAlert$.next(true);
    this.isSuccess = false;
    setTimeout(() => this.dismissAlert(), 5000);
  }

  showSuccessAlert(alertMsg: string): void {
    this.alertMessage$.next(alertMsg);
    this.showsAlert$.next(true);
    this.isSuccess = true;
    setTimeout(() => this.dismissAlert(), 5000);
  }

  dismissAlert(): void {
    this.showsAlert$.next(false);
  }
}
