import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { LogService } from '../../../shared/services';
import { Item } from './item.model';
import { ItemService } from './item.service';

@Injectable()
export class ItemResolver implements Resolve<Item> {
  constructor(
    private itemService: ItemService,
    private router: Router,
    private logger: LogService
  ) { }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const id = +route.params['id'];

    if (id === 0) {
      return new Item();
    }

    return this.itemService.getItem(id)
      .map(item => {
        if (item) {
          return item;
        }
        // We could throw an error here and catch it
        // and route back to the items list
        this.logger.error(`Item ${id} not found`);
        this.router.navigate(['', 'items']);
        return Observable.of(null);
      })
      .catch((error: any) => {
        this.router.navigate(['', 'items']);
        return Observable.of(null);
      });
  }
}
