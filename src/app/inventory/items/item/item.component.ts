import {
  Component,
  OnInit,
  AfterViewInit,
  OnChanges,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { MdSnackBar } from '@angular/material';

import {
  Size,
  EnumEx
} from '../../../core';
import { Item } from '../shared';
import { GenericValidator } from '../../../shared';
import { NameCode } from '../../../shared/models';

@Component({
  selector: 'fs-item-form',
  templateUrl: 'item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() public item: Item;
  @Input() public itemGroups: Array<{}> = [];
  @Input() public units: NameCode<number>[] = [];
  @Output() public onItemAdd = new EventEmitter();
  @Output() public onItemUpdate = new EventEmitter();
  public sizes = EnumEx.getNamesAndValuesString(Size);
  public displayMessage: { [key: string]: string } = {};
  public itemForm: FormGroup;
  public mode = 'Add';

  private genericValidator: GenericValidator;
  private validationMessages: { [key: string]: { [key: string]: string } };

  constructor(
    private fb: FormBuilder,
    private snackBar: MdSnackBar
  ) {
    this.initializeErrorMessages();
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  public ngOnInit(): void {
    const item = this.getItem();
    this.mode = this.isEditMode() ? 'Update' : 'Add';
    this.setItemForm(item);
  }

  public ngAfterViewInit(): void {
    this.itemForm.valueChanges.subscribe(() => {
      this.displayMessage = this.genericValidator.processMessages(this.itemForm);
    });
  }

  public ngOnChanges(): void {
    this.ngOnInit();
  }

  public saveItem(): void {
    const value = this.itemForm.value;
    this.isEditMode() ? this.onItemUpdate.emit(value) : this.onItemAdd.emit(value);
  }

  private setItemForm(item: Item) {
    this.itemForm = this.fb.group({
      id: [item.id],
      name: [item.name, [Validators.required, Validators.maxLength(200)]],
      code: [item.code, [Validators.required, Validators.maxLength(200)]],
      description: [item.description, [Validators.maxLength(1000)]],
      itemGroupId: [item.itemGroupId.toString(), [Validators.required]],
      unitId: [item.unitId.toString(), [Validators.required]],
      quantity: [item.quantity, [Validators.required, Validators.maxLength(8), Validators.pattern('^[0-9]*$')]],
      weight: [item.weight, [Validators.maxLength(8), Validators.pattern('[0-9]+(\.[0-9][0-9]?)?')]],
      safetyStockLevel: [item.safetyStockLevel, [Validators.maxLength(8), Validators.pattern('^[0-9]*$')]],
      size: [item.size.toString()],
      standardCost: [item.standardCost, [Validators.maxLength(8), Validators.pattern('[0-9]+(\.[0-9][0-9]?)?')]],
      listPrice: [item.listPrice, [Validators.maxLength(8), Validators.pattern('[0-9]+(\.[0-9][0-9]?)?')]],
      isSelfMade: [item.isSelfMade],
      isFinishedGood: [item.isFinishedGood],
      color: [item.color, [Validators.maxLength(20)]],
      daysToManufacture: [item.daysToManufacture, [Validators.maxLength(4), Validators.pattern('^[0-9]*$')]],
      sellStartDate: [item.sellStartDate],
      sellEndTime: [item.sellEndTime],
      reorderPoint: [item.reorderPoint]
    });
  }

  private isEditMode = () => this.item.id !== 0;

  private getItem(): Item {
    if (this.item) { return { ...this.item }; }
    return new Item();
  }

  private initializeErrorMessages() {
    this.validationMessages = {
      name: {
        required: 'Item name is required.',
        maxlength: 'Item name cannot exceed 200 characters.'
      },
      code: {
        required: 'Item code is required.',
        maxlength: 'Item code cannot exceed 50 characters.'
      }
    };
  }
}
