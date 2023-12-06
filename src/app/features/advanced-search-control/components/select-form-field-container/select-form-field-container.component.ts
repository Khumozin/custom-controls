import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldAppearance, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

import { CustomFormFieldControlComponent } from '../custom-form-field-control/custom-form-field-control.component';

type FormControlType = {
  scope: string;
  query: string;
};

@Component({
  selector: 'select-form-field-container',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatIconModule,
    CustomFormFieldControlComponent,
  ],
  templateUrl: './select-form-field-container.component.html',
  styleUrl: './select-form-field-container.component.scss',
})
export class SelectFormFieldContainerComponent implements OnInit, OnChanges {
  @Input() appearance: MatFormFieldAppearance = 'outline';
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() selectItems: { key: string; value: string }[] = [];

  formControl = new FormControl(
    { scope: '', query: '' },
    { nonNullable: true },
  );

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    this.setRequired();
    this.setDisabled();
  }

  private setRequired(): void {
    if (this.required) {
      this.formControl.setValidators(AdvancedSearchValidator);
    } else {
      this.formControl.setValidators(null);
    }

    this.formControl.updateValueAndValidity({ emitEvent: false });
  }

  private setDisabled(): void {
    this.disabled ? this.formControl.disable() : this.formControl.enable();
  }
}

function AdvancedSearchValidator() {
  return (control: FormControl<FormControlType>) => {
    return control.value.scope !== null && control.value.query !== ''
      ? null
      : { validateSearch: { valid: true } };
  };
}
