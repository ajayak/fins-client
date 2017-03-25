export class Item {
  public id: number;
  public name: string;
  public code: string;
  public description?: string;
  public isSelfMade: boolean;
  public isFinishedGood: boolean;
  public color?: string;
  public safetyStockLevel?: number;
  public reorderPoint?: string;
  public standardCost?: number;
  public listPrice?: number;
  public quantity: number;
  public size?: number;
  public weight?: number;
  public daysToManufacture?: number;
  public sellStartDate?: Date;
  public sellEndTime?: Date;
  public itemGroupId: number;
  public unitId: number;

  constructor() {
    this.id = 0;
    this.unitId = 0;
    this.itemGroupId = 0;
    this.size = 0;
  }
}
