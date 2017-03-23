import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared';
import { routedComponents } from './item.route';
import { ItemListComponent } from './item-list';
// import { ItemComponent } from './item';

import {
  ItemService,
  // ItemResolver,
  ItemGuard
} from './shared';

@NgModule({
  imports: [
    SharedModule,
  ],
  exports: [],
  declarations: [
    routedComponents,
    ItemListComponent,
    // ItemComponent
  ],
  providers: [
    ItemService,
    // ItemResolver,
    ItemGuard
  ]
})
export class ItemModule { }
