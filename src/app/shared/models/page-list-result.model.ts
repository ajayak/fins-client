export class PageListResultModel {
  public pageNo: number;
  public pageSize: number;
  public totalPages: number;
  public totalRecordCount: number;

  constructor() {
    this.pageNo = 1;
    this.pageSize = 10;
    this.totalPages = 1;
    this.totalRecordCount = 0;
  }
}
