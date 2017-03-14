export class AccountList {
  public id: number;
  public name: string;
  public displayName: string;
  public code: string;
  public accountGroupName: string;
}

// tslint:disable-next-line:max-classes-per-file
export class AccountPageList {
  public pageNo: number;
  public pageSize: number;
  public totalPages: number;
  public totalRecordCount: number;
  public items: AccountList[];

  constructor() {
    this.pageNo = 1;
    this.pageSize = 10;
    this.totalPages = 1;
    this.totalRecordCount = 0;
    this.items = [];
  }
}
