export class PagingModel {
  public pageNo: number;
  public pageSize: number;
  public sort: string;

  constructor() {
    this.pageNo = 1;
    this.pageSize = 10;
    this.sort = '';
  }
}
