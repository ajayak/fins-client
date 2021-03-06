import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ApiService } from '../../../shared/services';
import { config } from '../../../core';
import { NameCode } from '../../../shared/models';

@Injectable()
export class StatesService {
  constructor(private apiService: ApiService) { }

  public getAllStates(): Observable<NameCode<number>[]> {
    return this.apiService.get(config.urls.states);
  }
}
