import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private apiCount = 0;
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoadingSubject.asObservable();
  private isSuppressedSubject = new BehaviorSubject<boolean>(false);
  isSuppressed$ = this.isSuppressedSubject.asObservable();
  constructor() { }

  showLoader() {
    if (this.apiCount === 0) {
      this.isLoadingSubject.next(true);
    }
    this.apiCount++;
  }

  hideLoader() {
    this.apiCount--;
    if (this.apiCount === 0) {
      this.isLoadingSubject.next(false);
      this.unsuppress();
    }
  }

  suppress() {
    this.isSuppressedSubject.next(true);
  }
  unsuppress() {
    this.isSuppressedSubject.next(false);
  }
}
