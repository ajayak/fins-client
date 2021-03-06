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
import {
  CovalentDataTableModule,
  TdDataTableService
} from '@covalent/core/data-table/data-table.module';
import { CovalentPagingModule } from '@covalent/core/paging/paging.module';
import {
  CovalentExpansionPanelModule
} from '@covalent/core/expansion-panel/expansion-panel.module';
import {
  CovalentMediaModule,
  TdMediaService
} from '@covalent/core/media/media.module';
import { CovalentFileModule } from '@covalent/core/file/file.module';

// import { TdMediaService } from '../../../node_modules/@covalent/core/media/media.module';

// Ng Prime
import { TreeModule } from 'primeng/components/tree/tree';

import {
  Store,
  StoreHelper
} from './store';
import {
  ApiService,
  ToastService,
  LogService,
  EntityService
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
  declarations: [
    SpinnerComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    MaterialModule,

    // Third party Modules
    TreeModule,
    CovalentDataTableModule,
    CovalentPagingModule,
    CovalentExpansionPanelModule,
    CovalentMediaModule,
    CovalentFileModule,

    // App exports
    SpinnerComponent
  ],
  providers: [
    // Third party services
    TdDataTableService,
    TdMediaService,

    // App services
    SpinnerService,
    EntityService
  ]
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
        LogService,
        EntityService
      ]
    };
  }
}
