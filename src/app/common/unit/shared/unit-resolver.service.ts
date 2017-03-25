import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { UnitService } from './unit.service';
import { NameCode } from '../../../shared/models';

@Injectable()
export class UnitResolver implements Resolve<NameCode<number>[]> {
  constructor(private unitService: UnitService) { }

  public resolve() {
    return this.unitService.getAllUnits();
  }
}
