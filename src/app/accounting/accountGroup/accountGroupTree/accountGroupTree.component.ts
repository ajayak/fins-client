import {
  Component,
  Input,
  OnInit,
  ChangeDetectionStrategy,
  OnChanges
} from '@angular/core';

import { AccountGroupModel } from '../accountGroup.model';

@Component({
  selector: 'fs-account-group-tree',
  templateUrl: 'accountGroupTree.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountGroupTreeComponent implements OnInit, OnChanges {
  @Input() public accountGroups: AccountGroupModel[] = [];

  public ngOnInit() {
    console.log('Initialized', this.accountGroups);
  }

  public ngOnChanges() {
    console.log('On change', this.accountGroups);
  }
}
