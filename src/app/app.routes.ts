import { Routes } from '@angular/router';
import { HomeComponent } from './home';
import { NoContentComponent } from './no-content';

import { DataResolver } from './app.resolver';
import { AuthGuard } from './auth';

export const ROUTES: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: '**', component: NoContentComponent },
];
