import {
  Component,
  Input,
  ChangeDetectionStrategy,
  OnInit,
  OnChanges
} from '@angular/core';

import isNull from 'lodash/isNull.js';
import sortBy from 'lodash/sortBy';

import {
  TreeNode,
  MenuItem
} from 'primeng/components/common/api';

import { transformToTree } from '../../../shared/helpers';
import { AccountGroupModel } from '../accountGroup.model';

@Component({
  selector: 'fs-account-group-tree',
  templateUrl: 'accountGroupTree.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountGroupTreeComponent implements OnInit, OnChanges {
  @Input() public accountGroups: AccountGroupModel[];
  public accountGroupTreeItems: TreeNode = [];
  public selectedNode: TreeNode;
  public items: MenuItem[] = [
    { label: 'View', icon: 'fa-search', command: (event) => console.log(this.selectedNode) },
    { label: 'Unselect', icon: 'fa-close', command: () => this.selectedNode = null }
  ];

  public ngOnInit() {
    this.renderTree();
  }

  public ngOnChanges() {
    this.renderTree();
  }

  public renderTree() {
    this.accountGroupTreeItems = this.convertAccountGroupsToTreeNode(this.accountGroups);
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
