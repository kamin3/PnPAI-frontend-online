import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ToggleSidebarService {
    private sidebarSubject = new Subject<boolean>();

    sendMobileFlag(showSidebar: boolean) {
        this.sidebarSubject.next(showSidebar);
    }

    getMobileFlag() {
        return this.sidebarSubject.asObservable();
    }
}