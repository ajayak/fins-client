import {
  Component,
  Input,
  ChangeDetectionStrategy,
  OnInit,
  OnChanges,
  Output,
  EventEmitter,
  ViewChild
} from '@angular/core';
import {
  MdDialog,
  MdDialogRef,
  MdMenuTrigger
} from '@angular/material';
import {
  sortBy,
  isNil
} from 'lodash';

import { TreeNode } from 'primeng/components/common/api';

import { ItemGroupCreatorDialogComponent } from '../itemGroup-creator';
import { ToastService } from '../../../shared';
import {
  ItemGroup,
  ItemGroupTreeNode,
  ItemGroupService
} from '../shared';

@Component({
  selector: 'fs-item-group-tree',
  templateUrl: 'itemGroup-tree.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemGroupTreeComponent implements OnInit, OnChanges {
  @Input() public itemGroups: ItemGroup[];
  @Output() public onItemGroupUpdate = new EventEmitter();
  @Output() public onItemGroupAdd = new EventEmitter();
  @Output() public onItemGroupDelete = new EventEmitter();
  @ViewChild(MdMenuTrigger) public trigger: MdMenuTrigger;

  public dialogRef: MdDialogRef<ItemGroupCreatorDialogComponent>;
  public itemGroupTreeItems: TreeNode = [];
  public selectedNode: ItemGroupTreeNode;
  public items = [
    { label: 'View Details', icon: 'zoom_in', command: () => this.viewItemGroupDetails() },
    { label: 'Add Child', icon: 'add', command: () => this.addChild() },
    { label: 'Add Sibling', icon: 'add_circle', command: () => this.addSibling() },
    { label: 'Edit', icon: 'edit', command: () => this.editItemGroup() },
    { label: 'Delete', icon: 'delete', command: () => this.deleteItemGroup() }
  ];

  constructor(
    private dialog: MdDialog,
    private toastr: ToastService,
    private itemGroupService: ItemGroupService) { }

  public ngOnInit() {
    this.renderTree();
  }

  public ngOnChanges() {
    this.renderTree();
  }

  public renderTree() {
    const tree = this.itemGroupService.convertItemGroupsToTreeNode(this.itemGroups);
    tree.forEach(node => this.expandRecursive(node, true));
    this.itemGroupTreeItems = tree;
  }

  public viewItemGroupDetails() {
    this.openDialog({ ...this.selectedNode, mode: 'View' });
  }

  public addSibling(): void {
    let parentNode = this.selectedNode.parent as any;
    if (isNil(parentNode)) {
      parentNode = { parentId: 0, id: 0 };
    }
    this.openDialog({ ...parentNode, mode: 'Add' });
  }

  public addChild(): void {
    this.openDialog({ ...this.selectedNode, mode: 'Add' });
  }

  public editItemGroup(): void {
    this.openDialog({ ...this.selectedNode, mode: 'Update' });
  }

  public deleteItemGroup(): void {
    if (this.selectedNode.children.length > 0) {
      this.toastr.error({
        title: `Cannot delete ${this.selectedNode.label}`,
        text: 'Item group has related child item groups.'
      });
      return;
    }

    this.toastr.confirm({
      titleText: `Are you sure you want to delete ${this.selectedNode.label}?`
    }).then(() => this.onItemGroupDelete.emit(this.selectedNode.id));
  }

  public openDialog(data: ItemGroupTreeNode) {
    this.dialogRef = this.dialog.open(ItemGroupCreatorDialogComponent, { data });

    this.dialogRef.afterClosed()
      .subscribe(result => {
        if (data.mode === 'Add') {
          this.onItemGroupAdd.emit(result);
        } else if (data.mode === 'Update') {
          this.onItemGroupUpdate.emit(result);
        }
        this.dialogRef = null;
      });
  }

  public detectRightMouseClick($event) {
    if ($event.which === 3) {
      if ($event.target && $event.target.click) {
        $event.target.click();
      }
      this.trigger.openMenu();
      const menu = document.querySelector('.cdk-overlay-pane') as HTMLElement;
      menu.style.setProperty('left', `${$event.clientX}px`);
      menu.style.setProperty('top', `${$event.clientY}px`);
      return false;
    }
  }

  private expandRecursive(node: TreeNode, isExpand: boolean) {
    if (node.children && node.children.length > 0) {
      node.expanded = isExpand;
      node.children.forEach(childNode => {
        this.expandRecursive(childNode, isExpand);
      });
    }
  }
}
