import {
  Component,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';

import { AccountGroupModel } from '../accountGroup.model';

@Component({
  selector: 'fs-account-group-tree',
  templateUrl: 'accountGroupTree.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountGroupTreeComponent {
  @Input() public accountGroups: AccountGroupModel[];
}
