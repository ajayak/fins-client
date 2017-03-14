import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { LogService } from '../../../shared/services';
import { Account } from './account.model';
import { AccountService } from './account.service';

@Injectable()
export class AccountResolver implements Resolve<Account> {
  constructor(
    private accountService: AccountService,
    private router: Router,
    private logger: LogService
  ) { }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const id = +route.params['id'];

    if (id === 0) {
      return new Account();
    }

    return this.accountService.getAccount(id)
      .map(account => {
        if (account) {
          return account;
        }
        // We could throw an error here and catch it
        // and route back to the accounts list
        this.logger.error(`Account ${id} not found`);
        this.router.navigate(['', 'accounts']);
        return Observable.of(null);
      })
      .catch((error: any) => {
        this.router.navigate(['', 'accounts']);
        return Observable.of(null);
      });
  }
}
