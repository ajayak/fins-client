import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ApiService } from '../../../shared/services';
import { NameCode } from '../../../shared/models';
import { config } from '../../../core';

@Injectable()
export class UnitService {
  constructor(private apiService: ApiService) { }

  public getAllUnits(): Observable<NameCode<number>[]> {
    return this.apiService.get(config.urls.unit);
  }
}
