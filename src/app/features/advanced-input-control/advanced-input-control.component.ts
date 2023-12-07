import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { ErrorComponent, InputComponent } from './components';
import { PrefixIconDirective, SuffixIconDirective } from './directives';

type FormType = {
  name: FormControl<string | null>;
  surname: FormControl<string | null>;
};

@Component({
  selector: 'app-advanced-input-control',
  standalone: true,
  imports: [
    InputComponent,
    ErrorComponent,
    PrefixIconDirective,
    SuffixIconDirective,
    ReactiveFormsModule,
    JsonPipe,
  ],
  templateUrl: './advanced-input-control.component.html',
  styleUrl: './advanced-input-control.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdvancedInputControlComponent {
  form = new FormGroup<FormType>({
    name: new FormControl(null, [Validators.required]),
    surname: new FormControl(null, [Validators.required]),
  });

  control(key: keyof FormType): FormControl {
    return this.form.controls[key];
  }
}
