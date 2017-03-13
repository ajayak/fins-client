import { NgModule } from '@angular/core';

import { SharedModule } from '../shared';
import { StatesService } from './shared';

@NgModule({
  imports: [SharedModule],
  exports: [StatesService],
  declarations: [],
  providers: [StatesService],
})
export class StatesModule { }
