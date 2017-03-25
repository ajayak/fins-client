import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { StatesService } from './states.service';
import { NameCode } from '../../../shared/models';

@Injectable()
export class StatesResolver implements Resolve<NameCode<number>[]> {
  constructor(private statesService: StatesService) { }

  public resolve() {
    return this.statesService.getAllStates();
  }
}
