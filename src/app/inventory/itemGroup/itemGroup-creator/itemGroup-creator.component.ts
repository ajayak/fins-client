import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  AfterViewInit
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  AbstractControl,
  Validators
} from '@angular/forms';
import { MdDialogRef } from '@angular/material';

import {
  ItemGroupTreeNode,
  ItemGroup,
  ItemGroupService
} from '../shared';
import { GenericValidator } from '../../../shared';

// Change Detection onPush not used due to async validator on name field
@Component({
  selector: 'fs-item-group-creator-dialog',
  templateUrl: './itemGroup-creator.component.html',
  changeDetection: ChangeDetectionStrategy.Default
})
export class ItemGroupCreatorDialogComponent implements OnInit, AfterViewInit {
  public parent: ItemGroupTreeNode;
  public title = 'Add Root Item Group';
  public itemGroupForm: FormGroup;
  public displayMessage: { [key: string]: string } = {};
  public isReadonly: boolean;

  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;
  private validationTimeout;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MdDialogRef<ItemGroupCreatorDialogComponent>,
    private itemGroupService: ItemGroupService
  ) {
    this.initializeErrorMessages();
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  public ngOnInit() {
    // In edit mode, parent is the Item Group to edit
    this.parent = this.dialogRef.config.data as ItemGroupTreeNode;
    this.isReadonly = this.parent.mode === 'View';
    this.setDialogTitle();

    const itemGroup = this.getAddUpdateItemGroup();

    this.itemGroupForm = this.fb.group({
      name: [
        { value: itemGroup.name, disabled: this.isReadonly },
        [Validators.required, Validators.maxLength(200)],
        this.itemGroupAlreadyExistsValidator(itemGroup.parentId, itemGroup.name).bind(this)
      ],
      displayName: [
        { value: itemGroup.displayName, disabled: this.isReadonly },
        [Validators.required, Validators.maxLength(200)]
      ],
      parentId: [itemGroup.parentId],
      id: [itemGroup.id]
    });
  }

  public ngAfterViewInit(): void {
    this.itemGroupForm.valueChanges.subscribe(() => {
      this.displayMessage = this.genericValidator.processMessages(this.itemGroupForm);
    });

    this.itemGroupForm.get('name').statusChanges.subscribe(() => {
      this.displayMessage = this.genericValidator.processMessages(this.itemGroupForm);
    });
  }

  public itemGroupAlreadyExistsValidator(parentId: number, originalName: string) {
    return (control: AbstractControl) => {
      clearTimeout(this.validationTimeout);
      return new Promise(resolve => {
        this.validationTimeout = setTimeout(() => {
          const itemGroupName = control.value;
          const exists = this.itemGroupService
            .itemGroupExistsInOrganization(parentId, itemGroupName, originalName);
          return exists ? resolve({ itemGroupAlreadyExists: true }) : resolve(null);
        }, 600);
      });
    };
  }

  public addUpdateItemGroup($event) {
    $event.preventDefault();
    if (this.itemGroupForm.valid) {
      this.dialogRef.close(this.itemGroupForm.value);
    }
  }

  // Create object that is to be add/update
  private getAddUpdateItemGroup(): ItemGroup {
    if (this.isEditMode() || this.isReadonly) {
      return {
        name: this.parent.label,
        displayName: this.parent.data,
        id: this.parent.id,
        isPrimary: this.parent.children.length === 0,
        parentId: this.parent.parentId
      };
    } else {
      const itemGroup = new ItemGroup();
      itemGroup.parentId = this.parent.id;
      return itemGroup;
    }
  }

  private setDialogTitle() {
    if (this.isReadonly) {
      this.title = `Item Group details`;
    } else if (this.isEditMode()) {
      this.title = `Edit ${this.parent.label}'s Child Item Group`;
    } else {
      if (this.parent.id !== 0) {
        this.title = `Add ${this.parent.label}'s Child Item Group`;
      } else {
        this.title = `Add Root Item Group`;
      }
    }
  }

  private isEditMode = (): boolean => this.parent.mode === 'Update';

  private initializeErrorMessages() {
    this.validationMessages = {
      name: {
        required: 'Name is required.',
        maxlength: 'Name cannot exceed 200 characters.',
        itemGroupAlreadyExists: 'Item Group with same name already exists under this parent.'
      },
      displayName: {
        required: 'Display Name name is required.',
        maxlength: 'Display Name name cannot exceed 200 characters.'
      }
    };
  }
}
