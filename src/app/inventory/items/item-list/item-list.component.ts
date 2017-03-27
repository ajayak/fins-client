import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  OnChanges
} from '@angular/core';
import { isUndefined } from 'lodash';

import { PagingModel } from '../../../shared/models';
import { ToastService } from '../../../shared/services';
import {
  TdDataTableSortingOrder,
  ITdDataTableSortChangeEvent
} from '@covalent/core/data-table/data-table.module';
import { IPageChangeEvent } from '@covalent/core/paging/paging.module';

import {
  ItemList,
  ItemPageList
} from '../shared';

@Component({
  selector: 'fs-item-list',
  templateUrl: 'item-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
    img {
      cursor: pointer
    }
  `]
})
export class ItemListComponent implements OnInit, OnChanges {
  @Input() public itemList: ItemPageList = new ItemPageList();
  @Input() public gridColumns: number;
  @Output() public onChange = new EventEmitter();
  @Output() public onItemDelete = new EventEmitter();

  public columns = [
    { name: 'id', label: '', active: false },
    { name: 'name', label: 'Name', active: false },
    { name: 'code', label: 'Item Code', active: false },
    { name: 'itemGroupName', label: 'Item Group', active: false },
  ];

  public items: ItemList[] = [];
  public totalRecordCount: number;
  public searchTerm: string;
  public pageNo: number;
  public pageSize: number;
  public sortBy = 'name';
  public sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Descending;

  constructor(private toastr: ToastService) { }

  public ngOnInit(): void {
    this.updateGrid();
  }

  public ngOnChanges() {
    this.updateGrid();
  }

  public deleteItem(itemId: number) {
    const item = this.items.find(value => value.id === itemId);
    this.toastr.confirm({
      titleText: `Are you sure you want to delete ${item.name}?`
    }).then(() => this.onItemDelete.emit(itemId));
  }

  public sort(sortEvent: ITdDataTableSortChangeEvent): void {
    this.sortBy = sortEvent.name;
    this.columns.forEach(c => {
      if (c.name === sortEvent.name) {
        c.active = !c.active;
        this.sortOrder = c.active ? TdDataTableSortingOrder.Descending : TdDataTableSortingOrder.Ascending;
      } else {
        c.active = false;
      }
    });
    this.filter();
  }

  public search(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.filter();
  }

  public page(pagingEvent: IPageChangeEvent): void {
    this.pageNo = pagingEvent.page;
    this.pageSize = pagingEvent.pageSize;
    this.filter();
  }

  private filter(): void {
    const pagingInfo: PagingModel = {
      pageNo: this.pageNo,
      pageSize: this.pageSize,
      sort: (this.sortOrder === TdDataTableSortingOrder.Descending ? '-' : '') + this.sortBy
    };
    this.onChange.emit(pagingInfo);
  }

  private updateGrid(): void {
    this.pageNo = this.itemList.pageNo;
    this.pageSize = this.itemList.pageSize;
    this.totalRecordCount = this.itemList.totalRecordCount;
    this.items = this.itemList.items;
  }
}
