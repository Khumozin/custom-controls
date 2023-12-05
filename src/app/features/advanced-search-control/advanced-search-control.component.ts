import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';

import { SelectFormFieldContainerComponent } from './components';

@Component({
  selector: 'app-advanced-search-control',
  standalone: true,
  imports: [SelectFormFieldContainerComponent, AsyncPipe],
  templateUrl: './advanced-search-control.component.html',
  styleUrl: './advanced-search-control.component.scss',
})
export class AdvancedSearchControlComponent {
  items = [
    { key: '', value: 'All' },
    { key: 'bw', value: 'Botswana' },
    { key: 'sa', value: 'South Africa' },
    { key: 'ls', value: 'Lesotho' },
  ];
}
