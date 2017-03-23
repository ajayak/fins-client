import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ApiService } from '../../../shared/services';
import { config } from '../../../core';
import { Item } from './item.model';
import { UserProfileService } from '../../../auth';

@Injectable()
export class ItemService {
  private itemUrl = config.urls.item;

  constructor(
    private apiService: ApiService,
    private user: UserProfileService) { }

  // public getAllItems
  //   (pageNo?: number, pageSize?: number, sort?: string):
  //   Observable<ItemPageList> {
  //   let url = this.itemUrl;
  //   url += `?pageNo=${pageNo || 1}&pageSize=${pageSize || 0}&sort=${sort || ''}`;
  //   return this.apiService.get(url);
  // }

  public getItem(itemId: number): Observable<Item> {
    return this.apiService.get(`${this.itemUrl}/${itemId}`);
  }

  public addItem(item: Item): Observable<Item> {
    return this.apiService.post(this.itemUrl, item);
  }

  public updateItem(item: Item): Observable<Item> {
    return this.apiService.put(this.itemUrl, item);
  }

  public deleteItem(itemId: number): Observable<boolean> {
    return this.apiService.delete(`${this.itemUrl}/${itemId}`);
  }
}
