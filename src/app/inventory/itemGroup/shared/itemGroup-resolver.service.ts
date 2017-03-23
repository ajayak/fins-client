import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Resolve } from '@angular/router';
import { ItemGroupService } from './itemGroup.service';

@Injectable()
export class ItemGroupResolver implements Resolve<{ [key: string]: string }> {
  constructor(private itemGroupService: ItemGroupService) { }

  public resolve() {
    return this.itemGroupService.getItemGroupDictionary()
      .map(itemGroups => {
        if (itemGroups) {
          return this.mapObjectToArray(itemGroups);
        }
        return Observable.of(null);
      })
      .catch((error: any) => {
        return Observable.of(null);
      });
  }

  private mapObjectToArray(obj): Array<{}> {
    return Object.keys(obj)
      .map(id => ({ id: `${id}`, value: obj[id] }));
  }
}
