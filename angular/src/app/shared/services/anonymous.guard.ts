import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AccountService } from '@app/data/services/account.service';
import { CONFIG } from '@app/shared/configs';

export const anonymousGuard: CanActivateFn = (route, state) => {
  return !inject(AccountService).isLoggedIn() ?
    true :
    inject(Router).createUrlTree([CONFIG.landing.children.landing.route]);
};
