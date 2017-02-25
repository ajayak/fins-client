import {
  Component,
  Input,
  ChangeDetectionStrategy,
  OnInit,
  OnChanges
} from '@angular/core';

import isNull from 'lodash/isNull.js';
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
  public items: MenuItem[];
  public selectedNode: TreeNode;

  public renderTree() {
    this.accountGroupTreeItems = this.convertAccountGroupsToTreeNode(this.accountGroups);
  }
  public ngOnInit() {
    this.renderTree();
    this.items = [
      { label: 'View', icon: 'fa-search', command: (event) => console.log(this.selectedNode) },
      { label: 'Unselect', icon: 'fa-close', command: () => this.selectedNode = null }
    ];
  }

  public ngOnChanges() {
    this.renderTree();
  }

  /**
   * Convert AccountGroupModel[] to tree format
   * that p-tree component accepts
   * @private
   * @param {AccountGroupModel[]} accountGroups
   * @returns {TreeNode}
   *
   * @memberOf AccountGroupTreeComponent
   */
  private convertAccountGroupsToTreeNode(accountGroups: AccountGroupModel[]): TreeNode {
    if (isNull(accountGroups)) { return []; };

    let treeNodes: TreeNode[] = accountGroups.map(accountGroup => {
      let treeNode: TreeNode = {
        label: accountGroup.displayName,
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
