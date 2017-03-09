import { Person } from './person.model';

export class Account {
  public id: number;
  public name: string;
  public displayName: string;
  public code: string;
  public accountGroupId: number;
  public openingBalance?: number;
  public OpeningBalanceType: string;
  public address: string;
  public stateId: number;
  public ward: string;
  public itPanNumber: string;
  public lstNumber: string;
  public cstNumber: string;
  public tinNumber: string;
  public serviceTaxNumber: string;

  public persons: Person[];

  constructor() {
    this.id = 0;
    this.persons = [];
  }
}
