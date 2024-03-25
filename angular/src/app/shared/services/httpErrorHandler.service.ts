import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertService } from '@app/shared/services/alert.service';
import { TranslateService } from '@ngx-translate/core';


@Injectable({
    providedIn: 'root'
})
export class HttpErrorHandler {

    constructor(
        private alertService: AlertService,
        private translate: TranslateService
    ) { }

    handleError(error: HttpErrorResponse): void {
        // if (error.status < 500) {
        //     this.alertService.showFailureAlert(error.error.message);
        //     return;
        // }
        let generalErrorMessage = this.translate.instant('Errors.General');
        this.alertService.showFailureAlert(generalErrorMessage);
    }

}
