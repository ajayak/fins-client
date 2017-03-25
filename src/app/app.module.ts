import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import './core/reactive-extensions';

// App Modules
import { SharedModule } from './shared';
import { AuthModule } from './auth';
import { HomeModule } from './home';
import { AccountingModule } from './accounting';
import { InventoryModule } from './inventory';
import { CommonModule } from './common';

import {
  AppRoutingModule,
  routedComponents
} from './app.route.module';
import { AppComponent } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import {
  State,
  Store
} from './shared/store';

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  Store
];

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    ...routedComponents
  ],
  imports: [
    // import Angular's modules
    BrowserModule,
    FormsModule,
    HttpModule,

    // App Modules
    SharedModule.forRoot(),
    AuthModule,
    HomeModule,
    CommonModule,
    AccountingModule,
    InventoryModule,

    // 404 Route
    AppRoutingModule
  ],
  providers: [
    // expose our Services and Providers into Angular's dependency injection
    APP_PROVIDERS
  ]
})
export class AppModule { }
