import { NgClass, NgIf, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Directive,
  ElementRef,
  HostBinding,
  Input,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

import { Appearance, InputDirective } from '../../directives';

type InputType = 'text' | 'password';

@Directive({
  selector: '[appPrefixIcon]',
  standalone: true,
})
export class PrefixIconDirective {
  constructor(public template: TemplateRef<unknown>) {}
}

@Directive({
  selector: '[appSuffixIcon]',
  standalone: true,
})
export class SuffixIconDirective {
  constructor(public template: TemplateRef<unknown>) {}
}

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
      useExisting: InputComponent,
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent<T> {
  static nextId = 0;

  @Input()
  type: InputType = 'text';

  @Input()
  appearance: Appearance = 'standard';

  @Input()
  disabled = false;

  @Input()
  label = '';

  @Input()
  value: T | null = null;

  @HostBinding()
  protected id = `input-id-${InputComponent.nextId++}`;

  @ContentChild(PrefixIconDirective) prefixIcon?: PrefixIconDirective;
  @ContentChild(SuffixIconDirective) suffixIcon?: SuffixIconDirective;

  @ViewChild('input') inputEl!: ElementRef<HTMLInputElement>;

  protected isFocused = false;

  onClick() {
    this.inputEl.nativeElement.focus();
    this.isFocused = true;
  }

  onBlur() {
    this.isFocused = false;
  }
}
