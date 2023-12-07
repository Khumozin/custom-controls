import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'search-control',
    loadComponent: () =>
      import('./features').then((c) => c.AdvancedSearchControlComponent),
  },
  {
    path: 'select-control',
    loadComponent: () =>
      import('./features').then((c) => c.AdvancedSelectControlComponent),
  },
  {
    path: '',
    loadComponent: () =>
      import('./features').then((c) => c.AdvancedInputControlComponent),
  },
];
