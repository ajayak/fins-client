import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Resolve } from '@angular/router';
import { ItemGroupService } from './itemGroup.service';
import { mapObjectToArray } from '../../../shared/helpers';

@Injectable()
export class ItemGroupResolver implements Resolve<{ [key: string]: string }> {
  constructor(private itemGroupService: ItemGroupService) { }

  public resolve() {
    return this.itemGroupService.getItemGroupDictionary()
      .map(itemGroups => {
        if (itemGroups) {
          return mapObjectToArray(itemGroups);
        }
        return Observable.of(null);
      })
      .catch((error: any) => {
        return Observable.of(null);
      });
  }
}
