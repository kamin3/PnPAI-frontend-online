import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AccountService } from '@app/data/services/account.service';
import { CONFIG } from '@app/shared/configs';

export const authGuard: CanActivateFn = (route, state) => {
  return inject(AccountService).isLoggedIn() ?
    true :
    inject(Router).createUrlTree([CONFIG.auth.children.login.route]);
};
