import { NgModule } from '@angular/core';

import { ItemGroupModule } from './itemGroup';
import { ItemModule } from './items';

@NgModule({
  imports: [
    ItemGroupModule,
    ItemModule
  ],
  exports: [],
  declarations: [],
  providers: [],
})
export class InventoryModule { }
