import {
  Component,
  OnInit,
  AfterViewInit,
  OnChanges,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ChangeDetectorRef,
  NgZone,
  ChangeDetectionStrategy
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { MdSnackBar } from '@angular/material';
import { TdFileUploadComponent } from '@covalent/core/file/file-upload/file-upload.component';
import { includes } from 'lodash';

import {
  Size,
  EnumEx,
  config
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
  @ViewChild('itemImageFileUpload') public itemImageFileUpload: TdFileUploadComponent;
  public sizes = EnumEx.getNamesAndValuesString(Size);
  public displayMessage: { [key: string]: string } = {};
  public itemForm: FormGroup;
  public allowedFileExtensions = config.constants.allowedImageFormats.join(',');
  public mode = 'Add';
  public encodingInProgress = false;

  private genericValidator: GenericValidator;
  private validationMessages: { [key: string]: { [key: string]: string } };

  constructor(
    private fb: FormBuilder,
    private snackBar: MdSnackBar,
    private cd: ChangeDetectorRef,
    private zone: NgZone
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
    const value: Item = this.itemForm.value;
    this.isEditMode() ? this.onItemUpdate.emit(value) : this.onItemAdd.emit(value);
  }

  public onImageSelectEvent(file: File) {
    const maxSize = config.constants.maxItemImageSize;
    if (file.size / 1024 > maxSize * 1024) {
      this.clearImageControl(`File size should be less than ${maxSize} MB`);
    }
    const fileExtension = file.name.split('.').pop();
    const fileIsValid = includes(this.allowedFileExtensions, fileExtension);
    if (!fileIsValid) {
      this.clearImageControl(`Please select valid image file`);
    }
    this.encodingInProgress = true;
    this.encodeImageFileAsURL((result) => {
      this.zone.run(() => {
        this.itemForm.patchValue({ 'base64Image': result });
      });
    });
  }

  private encodeImageFileAsURL(cb) {
    const file = this.itemImageFileUpload.files as Blob;
    const reader = new FileReader();
    reader.onloadend = () => {
      this.encodingInProgress = false;
      cb(reader.result);
      this.cd.markForCheck();
    };
    reader.readAsDataURL(file);
  }

  private clearImageControl(message: string) {
    this.snackBar.open(message, 'Close', { duration: 2000 });
    this.itemImageFileUpload.cancel();
  }

  private setItemForm(item: Item) {
    this.itemForm = this.fb.group({
      id: [item.id],
      name: [item.name, [Validators.required, Validators.maxLength(200)]],
      code: [item.code, [Validators.required, Validators.maxLength(200)]],
      description: [item.description, [Validators.maxLength(1000)]],
      itemGroupId: [item.itemGroupId, [Validators.required]],
      unitId: [item.unitId, [Validators.required]],
      quantity: [item.quantity, [Validators.required, Validators.maxLength(8), Validators.pattern('^[0-9]*$')]],
      weight: [item.weight, [Validators.maxLength(8), Validators.pattern('[0-9]+(\.[0-9][0-9]?)?')]],
      safetyStockLevel: [item.safetyStockLevel, [Validators.maxLength(8), Validators.pattern('^[0-9]*$')]],
      size: [item.size],
      standardCost: [item.standardCost, [Validators.maxLength(8), Validators.pattern('[0-9]+(\.[0-9][0-9]?)?')]],
      listPrice: [item.listPrice, [Validators.maxLength(8), Validators.pattern('[0-9]+(\.[0-9][0-9]?)?')]],
      isSelfMade: [item.isSelfMade],
      isFinishedGood: [item.isFinishedGood],
      color: [item.color, [Validators.maxLength(20)]],
      daysToManufacture: [item.daysToManufacture, [Validators.maxLength(4), Validators.pattern('^[0-9]*$')]],
      sellStartDate: [item.sellStartDate],
      sellEndTime: [item.sellEndTime],
      reorderPoint: [item.reorderPoint, [Validators.maxLength(50)]],
      displayImageName: [item.displayImageName],
      base64Image: []
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
        required: 'Item name is required',
        maxlength: 'Item name cannot exceed 200 characters'
      },
      code: {
        required: 'Item code is required',
        maxlength: 'Item code cannot exceed 50 characters'
      },
      description: {
        maxlength: 'Description cannot exceed 50 characters'
      },
      itemGroupId: {
        required: 'Item Group is required'
      },
      unitId: {
        required: 'Unit is required'
      },
      quantity: {
        required: 'Quantity is required',
        maxlength: 'Quantity cannot exceed 8 characters',
        pattern: 'Quantity is not in valid format'
      },
      weight: {
        maxlength: 'Weight cannot exceed 8 characters',
        pattern: 'Weight is not in valid format'
      },
      safetyStockLevel: {
        maxlength: 'Safety Stock Level cannot exceed 8 characters',
        pattern: 'Safety Stock Level is not in valid format'
      },
      standardCost: {
        maxlength: 'Standard Cost cannot exceed 8 characters',
        pattern: 'Standard Cost is not in valid format'
      },
      listPrice: {
        maxlength: 'List Price cannot exceed 8 characters',
        pattern: 'List Price is not in valid format'
      },
      color: {
        maxlength: 'Color cannot exceed 20 characters'
      },
      reorderPoint: {
        maxlength: 'ReOrder Point cannot exceed 50 characters'
      },
      daysToManufacture: {
        maxlength: 'Days To Manufacture cannot exceed 4 characters.',
        pattern: 'Days To Manufacture is not in valid format'
      }
    };
  }
}
