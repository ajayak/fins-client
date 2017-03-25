import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared';
import {
  UnitService,
  UnitResolver
} from './shared';

@NgModule({
  imports: [SharedModule],
  exports: [],
  declarations: [],
  providers: [
    UnitService,
    UnitResolver
  ]
})
export class UnitModule { }
