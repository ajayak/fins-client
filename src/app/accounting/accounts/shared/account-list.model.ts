import { PageListResultModel } from '../../../shared/models';

export class AccountList {
  public id: number;
  public name: string;
  public displayName: string;
  public code: string;
  public accountGroupName: string;
}

// tslint:disable-next-line:max-classes-per-file
export class AccountPageList extends PageListResultModel {
  public items: AccountList[];

  constructor() {
    super();
    this.items = [];
  }
}
