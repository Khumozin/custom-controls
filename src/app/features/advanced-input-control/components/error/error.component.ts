import { KeyValuePipe } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [KeyValuePipe],
  templateUrl: './error.component.html',
  styleUrl: './error.component.scss',
})
export class ErrorComponent implements OnChanges {
  @Input()
  control!: FormControl;

  @Input()
  errors: Record<string, ValidationErrors> | null = {};

  @Input()
  touched = false;

  @Input()
  customErrorMessages: Record<string, string> = {};

  errorMessages: Record<string, string> = {
    required: 'This field is required',
  };

  ngOnChanges(changes: SimpleChanges): void {
    const { customErrorMessages } = changes;
    if (customErrorMessages) {
      this.errorMessages = {
        ...this.errorMessages,
        ...customErrorMessages.currentValue,
      };
    }
  }
}
