import {
  Component,
  OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MdSnackBar } from '@angular/material';

import {
  Item,
  ItemService
} from '../shared';
import { NameCode } from '../../../shared/models';
import { ToastService } from '../../../shared/services';

@Component({
  selector: 'fs-item',
  template: `
    <fs-item-form
      [item]="item"
      [itemGroups]="itemGroupDictionary"
      [units]="units"
      (onItemAdd)="onItemAdd($event)"
      (onItemUpdate)="onItemUpdate($event)"
    ></fs-item-form>
  `
})
// tslint:disable-next-line:component-class-suffix
export class ItemContainer implements OnInit {
  public item: Item;
  public itemGroupDictionary: Array<{}> = [];
  public units: Array<NameCode<number>[]> = [];

  constructor(
    private route: ActivatedRoute,
    private itemService: ItemService,
    private toastr: ToastService,
    private snackBar: MdSnackBar) { }

  public ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.item = data.item;
      this.itemGroupDictionary = data.itemGroups;
      this.units = data.units;
    });
  }

  public onItemAdd(item: Item) {
    this.itemService.addItem(item)
      .subscribe(
      (result: Item) => this.onSuccess(result, 'Added'),
      (error) => this.onError(error));
  }

  public onItemUpdate(item: Item) {
    this.itemService.updateItem(item)
      .subscribe(
      (result: Item) => this.onSuccess(result, 'Updated'),
      (error) => this.onError(error));
  }

  private onSuccess(item: Item, mode: string) {
    this.item = item;
    this.snackBar.open(`Item ${mode} successfully`, 'Close', { duration: 2000 });
  }

  private onError(error) {
    this.toastr.error({ title: 'Failed to save item', text: 'Please try again later' });
  }
}
