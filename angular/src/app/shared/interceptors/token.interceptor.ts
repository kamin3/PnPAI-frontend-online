import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccountService } from '@app/data/services/account.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptor implements HttpInterceptor {
  constructor(private accountService: AccountService) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let token = this.accountService.getToken();
    if (token) {
      req = req.clone({
        setHeaders: {
          "Authorization": `Bearer ${token}`
        }
      });
    }
    return next.handle(req);
  }
}
