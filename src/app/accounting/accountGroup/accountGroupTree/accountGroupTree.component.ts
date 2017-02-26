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

import isNull from 'lodash/isNull.js';
import sortBy from 'lodash/sortBy';

import { AccountGroupCreatorDialogComponent } from '../accountGroupCreator';
import {
  TreeNode,
  MenuItem
} from 'primeng/components/common/api';

import {
  transformToTree,
  ToastService
} from '../../../shared';
import {
  AccountGroupModel,
  AccountGroupTreeNode
} from '../accountGroup.model';

@Component({
  selector: 'fs-account-group-tree',
  templateUrl: 'accountGroupTree.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountGroupTreeComponent implements OnInit, OnChanges {
  @Input() public accountGroups: AccountGroupModel[];
  @Output() public onAccountGroupUpdate = new EventEmitter();
  @Output() public onAccountGroupAdd = new EventEmitter();
  @Output() public onAccountGroupDelete = new EventEmitter();

  public dialogRef: MdDialogRef<AccountGroupCreatorDialogComponent>;
  public accountGroupTreeItems: TreeNode = [];
  public selectedNode: AccountGroupTreeNode;
  public items: MenuItem[] = [
    { label: 'View Details', icon: 'fa-search', command: () => console.log(this.selectedNode) },
    { label: 'Add Child', icon: 'fa-plus', command: () => this.addChild() },
    { label: 'Add Sibling', icon: 'fa-plus', command: () => this.addSibling() },
    { label: 'Edit', icon: 'fa-edit', command: () => this.addChild() },
    { label: 'Delete', icon: 'fa-remove', command: () => this.deleteAccountGroup() }
  ];

  constructor(
    private dialog: MdDialog,
    private toastr: ToastService) { }

  public ngOnInit() {
    this.renderTree();
  }

  public ngOnChanges() {
    this.renderTree();
  }

  public renderTree() {
    this.accountGroupTreeItems = this.convertAccountGroupsToTreeNode(this.accountGroups);
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

  public addSibling() {
    let parentNode = this.selectedNode.parent as any;
    if (isNull(parentNode)) {
      parentNode = { parentId: 0, id: 0 };
    }
    this.openDialog({ ...parentNode, mode: 'ADD' });
  }

  public addChild() {
    this.openDialog({ ...this.selectedNode, mode: 'ADD' });
  }

  public openDialog(data: AccountGroupTreeNode) {
    this.dialogRef = this.dialog.open(AccountGroupCreatorDialogComponent, { data });

    this.dialogRef.afterClosed()
      .subscribe(result => {
        if (data.mode === 'ADD') {
          this.onAccountGroupAdd.emit(result);
        } else {
          this.onAccountGroupUpdate.emit(result);
        }
        this.dialogRef = null;
      });
  }

  private convertAccountGroupsToTreeNode(accountGroups: AccountGroupModel[]): TreeNode {
    if (isNull(accountGroups)) { return []; };
    accountGroups = sortBy(accountGroups, (ag: AccountGroupModel) => ag.name.toLowerCase());
    let treeNodes: TreeNode[] = accountGroups.map(accountGroup => {
      let treeNode: TreeNode = {
        label: accountGroup.name,
        data: accountGroup.displayName,
        expandedIcon: 'fa-folder-open',
        collapsedIcon: 'fa-folder'
      };
      treeNode['id'] = accountGroup.id;
      treeNode['parentId'] = accountGroup.parentId;
      return treeNode;
    });
    return transformToTree(treeNodes) as TreeNode;
  }
}
