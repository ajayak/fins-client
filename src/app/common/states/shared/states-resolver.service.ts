import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { StatesService } from './states.service';
import { States } from './states.model';

@Injectable()
export class StatesResolver implements Resolve<States[]> {
  constructor(private statesService: StatesService) { }

  public resolve() {
    return this.statesService.getAllStates();
  }
}
