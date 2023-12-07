import { NgClass, NgIf, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ElementRef,
  forwardRef,
  HostBinding,
  Input,
  ViewChild,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

import {
  Appearance,
  ControlValueAccessorDirective,
  InputDirective,
  PrefixIconDirective,
  SuffixIconDirective,
} from '../../directives';

type InputType = 'text' | 'password' | 'number';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [
    NgIf,
    NgClass,
    PrefixIconDirective,
    SuffixIconDirective,
    InputDirective,
    NgTemplateOutlet,
    ReactiveFormsModule,
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent<T> extends ControlValueAccessorDirective<T> {
  static nextId = 0;

  @Input()
  type: InputType = 'text';

  @Input()
  appearance: Appearance = 'standard';

  @Input()
  disabled = false;

  @Input()
  label = '';

  @HostBinding()
  protected id = `input-id-${InputComponent.nextId++}`;

  @ContentChild(PrefixIconDirective) prefixIcon?: PrefixIconDirective;
  @ContentChild(SuffixIconDirective) suffixIcon?: SuffixIconDirective;

  @ViewChild('input') inputEl!: ElementRef<HTMLInputElement>;

  protected isFocused = false;

  onClick() {
    if (this.isFocused) return;

    this.inputEl.nativeElement.focus();
    this.isFocused = true;
  }

  onBlur() {
    if (!this.isFocused) return;

    this.isFocused = false;
  }
}
