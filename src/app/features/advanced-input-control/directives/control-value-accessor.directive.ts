import { Directive, Inject, Injector, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  FormControlDirective,
  FormControlName,
  FormGroupDirective,
  NgControl,
  Validators,
} from '@angular/forms';
import { distinctUntilChanged, startWith, Subject, takeUntil, tap } from 'rxjs';

type OnChangeFn<T> = (value: T | null) => void;

type OnTouchedFn = () => void;

@Directive({
  selector: '[appControlValueAccessor]',
  standalone: true,
})
export class ControlValueAccessorDirective<T> implements OnInit, OnDestroy {
  control!: FormControl<T | null>;
  isRequired = false;

  private _isDisabled = false;
  private _destroy$ = new Subject<void>();
  private _onTouched: OnTouchedFn = () => {};

  constructor(@Inject(Injector) protected injector: Injector) {}

  ngOnInit() {
    this.setFormControl();
    this.isRequired = this.control?.hasValidator(Validators.required) ?? false;
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  setFormControl() {
    try {
      const formControl = this.injector.get(NgControl);

      switch (formControl.constructor) {
        case FormControlName:
          this.control = this.injector
            .get(FormGroupDirective)
            .getControl(formControl as FormControlName);
          break;
        default:
          this.control = (formControl as FormControlDirective)
            .form as FormControl;
          break;
      }
    } catch (err) {
      this.control = new FormControl();
    }
  }

  writeValue(value: T): void {
    this.control
      ? this.control.setValue(value)
      : (this.control = new FormControl(value));
  }

  registerOnChange(fn: (val: T | null) => T): void {
    this.control?.valueChanges
      .pipe(
        takeUntil(this._destroy$),
        startWith(this.control.value),
        distinctUntilChanged(),
        tap((val) => fn(val)),
      )
      .subscribe(() => this.control?.markAsUntouched());
  }

  registerOnTouched(fn: () => T): void {
    this._onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this._isDisabled = isDisabled;
  }
}
