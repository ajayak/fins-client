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

// Covalent
import { CovalentDataTableModule } from '@covalent/core/data-table/data-table.module';

// Ng Prime
import { TreeModule } from 'primeng/components/tree/tree';
import { ContextMenuModule } from 'primeng/components/contextmenu/contextmenu';

import {
  Store,
  StoreHelper
} from './store';
import {
  ApiService,
  ToastService,
  LogService
} from './services';
import { JwtHelperService } from './services';
import {
  SpinnerComponent,
  SpinnerService
} from './spinner';

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule.forRoot()
  ],
  declarations: [SpinnerComponent],
  exports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    MaterialModule,

    // Third party Modules
    TreeModule,
    CovalentDataTableModule,

    // App exports
    SpinnerComponent,
    ContextMenuModule
  ],
  providers: [SpinnerService]
})
export class SharedModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        // App providers
        ApiService,
        JwtHelperService,
        Store,
        StoreHelper,
        ToastService,
        LogService
      ]
    };
  }
}
