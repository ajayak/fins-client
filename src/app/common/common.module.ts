import { NgModule } from '@angular/core';

import { UnitModule } from './unit';
import { StatesModule } from './states';

@NgModule({
  imports: [
    StatesModule,
    UnitModule
  ],
  exports: [],
  declarations: [],
  providers: [],
})
export class CommonModule { }
