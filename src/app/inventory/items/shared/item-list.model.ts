import { PageListResultModel } from '../../../shared/models';

export class ItemList {
  public id: number;
  public name: string;
  public displayName: string;
  public code: string;
  public itemGroupName: string;
  public imageUrl: string;
}

// tslint:disable-next-line:max-classes-per-file
export class ItemPageList extends PageListResultModel {
  public items: ItemList[];

  constructor() {
    super();
    this.items = [];
  }
}
