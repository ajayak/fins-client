export class AccountGroupModel {
  public id: number;
  public name: string;
  public displayName: string;
  public parentId: number;
  public isPrimary: boolean;
}

// tslint:disable-next-line:max-classes-per-file
export class AccountGroupTreeNode {
  public id: number;
  public data: string;
  public label: string;
  public parentId: number;
  public parent?: AccountGroupTreeNode;
  public children?: AccountGroupTreeNode[];
  public mode: 'ADD' | 'EDIT';
}
