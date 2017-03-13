import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import {
  States,
  StatesService
} from '../../../states/shared';

@Injectable()
export class StatesResolver implements Resolve<States[]> {
  constructor(private statesService: StatesService) { }

  public resolve() {
    return this.statesService.getAllStates();
  }
}
