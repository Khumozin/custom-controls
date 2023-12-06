import { Component } from '@angular/core';

import { OptionComponent, SelectComponent } from './components';

@Component({
  selector: 'app-advanced-select-control',
  standalone: true,
  imports: [SelectComponent, OptionComponent],
  templateUrl: './advanced-select-control.component.html',
  styleUrl: './advanced-select-control.component.scss',
})
export class AdvancedSelectControlComponent {
  selectedValue = 'koketso';

  constructor() {
  }

  onSelectionChanged(value: string | null) {
    console.log(value);
  }
}
