import { FocusMonitor } from '@angular/cdk/a11y';
import { NgStyle } from '@angular/common';
import { Component, ElementRef, HostBinding, Input, OnDestroy, OnInit, Optional, Self, ViewChild } from '@angular/core';
import {
  ControlValueAccessor,
  FormGroupDirective,
  NgControl,
  NgForm,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Subject, Subscription, take } from 'rxjs';

export interface FormFieldValue {
  query: string;
  scope: string;
}

export class CustomErrorMatcher implements ErrorStateMatcher {
  isErrorState(control: UntypedFormControl): boolean {
    return control.dirty && control.invalid;
  }
}

class SearchInputBase {
  constructor(
    public _parentFormGroup: FormGroupDirective,
    public _parentForm: NgForm,
    public _defaultErrorStateMatcher: ErrorStateMatcher,
    public ngControl: NgControl,
  ) {}
}

// const _SearchInputMixinBase = mixinErrorState(SearchInputBase);

@Component({
  selector: 'custom-form-field-control',
  standalone: true,
  imports: [
    MatSelectModule,
    MatInputModule,
    MatDividerModule,
    ReactiveFormsModule,
    NgStyle,
  ],
  templateUrl: './custom-form-field-control.component.html',
  styleUrl: './custom-form-field-control.component.scss',
  providers: [
    {
      provide: MatFormFieldControl,
      useExisting: CustomFormFieldControlComponent,
    },
    {
      provide: ErrorStateMatcher,
      useClass: CustomErrorMatcher,
    },
  ],
})
// DoCheck,
export class CustomFormFieldControlComponent
  implements
    OnInit,
    OnDestroy,
    MatFormFieldControl<FormFieldValue>,
    ControlValueAccessor
{
  static nextId = 0;
  stateChanges = new Subject<void>();

  @ViewChild(MatInput, { read: ElementRef, static: true })
  input!: ElementRef;

  @Input() selectItems: { key: string; value: string }[] = [];

  @Input()
  set value(value: FormFieldValue) {
    this.form.patchValue(value);
    this.stateChanges.next();
  }
  get value() {
    return this.form.value;
  }

  @HostBinding()
  id = `custom-form-field-id-${CustomFormFieldControlComponent.nextId++}`;

  @Input()
  set placeholder(value: string) {
    this._placeholder = value;
    this.stateChanges.next();
  }
  get placeholder() {
    return this._placeholder;
  }

  private _placeholder!: string;

  focused!: boolean;

  get empty(): boolean {
    return !this.value.query && !this.value.scope;
  }

  @HostBinding('class.floated')
  get shouldLabelFloat(): boolean {
    return true;
  }

  @Input() required!: boolean;

  @Input() disabled!: boolean;

  controlType? = 'custom-form-field';

  @HostBinding('attr.aria-describedby') describedBy? = '';

  autofilled?: boolean = false;

  onChange!: (value: FormFieldValue) => void;

  onTouch!: () => void;

  form: UntypedFormGroup;

  formSub = new Subscription();

  constructor(
    private focusMonitor: FocusMonitor,
    @Optional() @Self() public ngControl: NgControl,
    private fb: UntypedFormBuilder,
    public _defaultErrorStateMatcher: ErrorStateMatcher,
    @Optional() _parentForm: NgForm,
    @Optional() _parentFormGroup: FormGroupDirective,
  ) {
    // super(_parentFormGroup, _parentForm, _defaultErrorStateMatcher, ngControl);

    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }

    // build form
    this.form = this.fb.group({
      scope: new UntypedFormControl(''),
      query: new UntypedFormControl(''),
    });
  }
  errorState!: boolean;
  userAriaDescribedBy?: string;

  writeValue(obj: FormFieldValue): void {
    this.value = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    if (isDisabled) {
      this.form.disable();
    }
    this.stateChanges.next();
  }

  setDescribedByIds(ids: string[]): void {
    this.describedBy = ids.join(' ');
  }

  onContainerClick(): void {
    this.focusMonitor.focusVia(this.input, 'program');
  }

  ngOnInit(): void {
    // focus on control when clicking on input field
    this.focusMonitor.monitor(this.input).subscribe((focused) => {
      this.focused = !!focused;
      this.stateChanges.next();
    });

    // run validation when input is touched & dirty
    this.focusMonitor
      .monitor(this.input)
      .pipe(take(1))
      .subscribe(() => {
        this.onTouch();
      });

    // mark form as dirty when value is changes to empty string
    this.formSub = this.form.valueChanges.subscribe((value) => {
      this.onChange(value);
    });
  }

  // ngDoCheck(): void {
  //   if (this.ngControl) {
  //     this.updateErrorState();
  //   }
  // }

  ngOnDestroy(): void {
    this.focusMonitor.stopMonitoring(this.input);
    this.stateChanges.complete();

    if (this.formSub) {
      this.formSub.unsubscribe();
    }
  }
}
