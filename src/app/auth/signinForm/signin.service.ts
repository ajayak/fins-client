import { Injectable } from '@angular/core';

import { AppState } from '../../app.service';

@Injectable()
export class SigninService {

  constructor(
    private appState: AppState
  ) { }
}
