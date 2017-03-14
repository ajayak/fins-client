import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../../shared/services';
import { config } from '../../core';
import { States } from './states.model';

@Injectable()
export class StatesService {
  constructor(private apiService: ApiService) { }

  public getAllStates(): Observable<States[]> {
    return this.apiService.get(config.urls.states);
  }
}
