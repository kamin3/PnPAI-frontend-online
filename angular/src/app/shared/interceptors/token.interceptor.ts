import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '@app/data/services/account.service';
import { Observable, catchError, of, throwError } from 'rxjs';
import { CONFIG } from '@app/shared/configs';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptor implements HttpInterceptor {

  loginRoute = CONFIG.auth.children.login.route

  constructor(
    private accountService: AccountService,
    private router: Router
  ) { }

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
    return next.handle(req).pipe(catchError(x => this.handleAuthError(x)));;
  }

  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    if (err.status === 401 || err.status === 403) {
      this.accountService.logout();
      this.router.navigateByUrl(this.loginRoute);
      // if you've caught / handled the error, you don't want to rethrow it unless you also want downstream consumers to have to handle it as well.
      return of(err.message); // or EMPTY may be appropriate here
    }
    return throwError(() => err);
  }
}
