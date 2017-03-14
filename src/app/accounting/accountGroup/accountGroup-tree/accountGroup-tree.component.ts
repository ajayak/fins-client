import {
  Component,
  Input,
  ChangeDetectionStrategy,
  OnInit,
  Output,
  EventEmitter,
  OnChanges
} from '@angular/core';
import {
  MdDialog,
  MdDialogRef
} from '@angular/material';

import isNil from 'lodash/isNil.js';
import { sortBy } from 'lodash';

import {
  TreeNode,
  MenuItem
} from 'primeng/components/common/api';

import { AccountGroupCreatorDialogComponent } from '../accountGroup-creator';
import { ToastService } from '../../../shared';
import {
  AccountGroup,
  AccountGroupTreeNode,
  AccountGroupService
} from '../shared';

@Component({
  selector: 'fs-account-group-tree',
  templateUrl: 'accountGroup-tree.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountGroupTreeComponent implements OnInit, OnChanges {
  @Input() public accountGroups: AccountGroup[];
  @Output() public onAccountGroupUpdate = new EventEmitter();
  @Output() public onAccountGroupAdd = new EventEmitter();
  @Output() public onAccountGroupDelete = new EventEmitter();

  public dialogRef: MdDialogRef<AccountGroupCreatorDialogComponent>;
  public accountGroupTreeItems: TreeNode = [];
  public selectedNode: AccountGroupTreeNode;
  public items: MenuItem[] = [
    { label: 'View Details', icon: 'fa-search', command: () => this.viewAccountGroupDetails() },
    { label: 'Add Child', icon: 'fa-plus', command: () => this.addChild() },
    { label: 'Add Sibling', icon: 'fa-plus', command: () => this.addSibling() },
    { label: 'Edit', icon: 'fa-edit', command: () => this.editAccountGroup() },
    { label: 'Delete', icon: 'fa-remove', command: () => this.deleteAccountGroup() }
  ];

  constructor(
    private dialog: MdDialog,
    private toastr: ToastService,
    private accountGroupService: AccountGroupService) { }

  public ngOnInit() {
    this.renderTree();
  }

  public ngOnChanges() {
    this.renderTree();
  }

  public renderTree() {
    let tree = this.accountGroupService.convertAccountGroupsToTreeNode(this.accountGroups);
    tree.forEach(node => this.expandRecursive(node, true));
    this.accountGroupTreeItems = tree;
  }

  public viewAccountGroupDetails() {
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

  public editAccountGroup(): void {
    this.openDialog({ ...this.selectedNode, mode: 'Update' });
  }

  public deleteAccountGroup(): void {
    if (this.selectedNode.children.length > 0) {
      this.toastr.error({
        title: `Cannot delete ${this.selectedNode.label}`,
        text: 'Account group has related child account groups.'
      });
      return;
    }

    this.toastr.confirm({
      titleText: `Are you sure you want to delete ${this.selectedNode.label}?`
    }).then(() => this.onAccountGroupDelete.emit(this.selectedNode.id));
  }

  public openDialog(data: AccountGroupTreeNode) {
    this.dialogRef = this.dialog.open(AccountGroupCreatorDialogComponent, { data });

    this.dialogRef.afterClosed()
      .subscribe(result => {
        if (data.mode === 'Add') {
          this.onAccountGroupAdd.emit(result);
        } else if (data.mode === 'Update') {
          this.onAccountGroupUpdate.emit(result);
        }
        this.dialogRef = null;
      });
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
