import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { InputComponent, PrefixIconDirective, SuffixIconDirective } from './components';

@Component({
  selector: 'app-advanced-input-control',
  standalone: true,
  imports: [
    InputComponent,
    PrefixIconDirective,
    SuffixIconDirective,
    ReactiveFormsModule,
  ],
  templateUrl: './advanced-input-control.component.html',
  styleUrl: './advanced-input-control.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdvancedInputControlComponent {
  control = 'Test 1';

}
