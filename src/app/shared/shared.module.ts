import {
  NgModule,
  ModuleWithProviders
} from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Material 2
import { MaterialModule } from '@angular/material';
import 'hammerjs';

import {
  Store,
  StoreHelper
} from './store';
import {
  ApiService,
  ToastService,
  LoggerService
} from './services';
import { JwtHelper } from './helpers';

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule.forRoot()
  ],
  declarations: [],
  exports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    MaterialModule
  ],
})
export class SharedModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        // App providers
        ApiService,
        JwtHelper,
        Store,
        StoreHelper,
        ToastService
      ]
    };
  }
}
