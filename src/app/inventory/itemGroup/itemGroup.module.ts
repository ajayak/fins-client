import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared';
import {
  ItemGroupService,
  ItemGroupGuard,
  ItemGroupResolver
} from './shared';
import { routedComponents } from './itemGroup.route';
import { ItemGroupTreeComponent } from './itemGroup-tree';
import { AddItemGroupComponent } from './itemGroup-adder';
import { ItemGroupCreatorDialogComponent } from './itemGroup-creator';

@NgModule({
  imports: [
    SharedModule,
  ],
  exports: [],
  declarations: [
    routedComponents,
    ItemGroupTreeComponent,
    AddItemGroupComponent,
    ItemGroupCreatorDialogComponent
  ],
  providers: [
    ItemGroupService,
    ItemGroupGuard,
    ItemGroupResolver
  ],
  entryComponents: [ItemGroupCreatorDialogComponent]
})
export class ItemGroupModule { }
