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
  ITdDataTableSortChangeEvent,
  ITdDataTableColumn
} from '@covalent/core/data-table/data-table.module';
import { IPageChangeEvent } from '@covalent/core/paging/paging.module';

import {
  AccountPageList,
  AccountList
} from '../shared';

@Component({
  selector: 'fs-account-list',
  templateUrl: 'account-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountListComponent implements OnInit, OnChanges {
  @Input() public accountList: AccountPageList = new AccountPageList();
  @Output() public onChange = new EventEmitter();
  @Output() public onAccountDelete = new EventEmitter();

  public columns: ITdDataTableColumn[] = [
    { name: 'id', label: '' },
    { name: 'name', label: 'Name' },
    { name: 'displayName', label: 'Display Name', tooltip: 'Used in printing' },
    { name: 'code', label: 'Account Code' },
    { name: 'accountGroupName', label: 'Account Group' },
  ];

  public accounts: AccountList[] = [];
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

  public deleteAccount(accountId: number) {
    const account = this.accounts.find(value => value.id === accountId);
    this.toastr.confirm({
      titleText: `Are you sure you want to delete ${account.name}?`
    }).then(() => this.onAccountDelete.emit(accountId));
  }

  public sort(sortEvent: ITdDataTableSortChangeEvent): void {
    this.sortBy = sortEvent.name;
    this.sortOrder = sortEvent.order;
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
    this.pageNo = this.accountList.pageNo;
    this.pageSize = this.accountList.pageSize;
    this.totalRecordCount = this.accountList.totalRecordCount;
    this.accounts = this.accountList.items;
  }
}
