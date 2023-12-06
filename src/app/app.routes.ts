import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'search-control',
    loadComponent: () =>
      import('./features/advanced-search-control').then(
        (c) => c.AdvancedSearchControlComponent,
      ),
  },
  {
    path: '',
    loadComponent: () =>
      import('./features/advanced-select-control').then(
        (c) => c.AdvancedSelectControlComponent,
      ),
  },
];
