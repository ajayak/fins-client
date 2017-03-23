import { NgModule } from '@angular/core';

import { SharedModule } from '../shared';
import {
  StatesService,
  StatesResolver
} from './shared';

@NgModule({
  imports: [SharedModule],
  exports: [],
  declarations: [],
  providers: [
    StatesService,
    StatesResolver
  ]
})
export class StatesModule { }
