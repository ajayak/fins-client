export class ItemGroup {
  public id: number;
  public name: string;
  public displayName: string;
  public parentId: number;
  public isPrimary: boolean;

  constructor() {
    this.id = 0;
    this.name = '';
    this.displayName = '';
    this.isPrimary = true;
    this.parentId = 0;
  }
}

// tslint:disable-next-line:max-classes-per-file
export class ItemGroupTreeNode {
  public id: number;
  public data: string;
  public label: string;
  public parentId: number;
  public parent?: ItemGroupTreeNode;
  public children?: ItemGroupTreeNode[];
  public mode: 'Add' | 'Update' | 'View';
}
