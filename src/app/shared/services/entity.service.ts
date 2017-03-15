import { Injectable } from '@angular/core';

@Injectable()
export class EntityService {
  public clone<T>(source: T): T {
    return Object.assign({}, source);
  }

  public merge = (target: any, ...sources: any[]) => Object.assign(target, ...sources);

  public propertiesDiffer = (entityA: {}, entityB: {}) =>
    Object.keys(entityA).find(key => entityA[key] !== entityB[key])
}
