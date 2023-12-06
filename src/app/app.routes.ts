import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'search-control',
    loadComponent: () =>
      import('./features').then((c) => c.AdvancedSearchControlComponent),
  },
  {
    path: '',
    loadComponent: () =>
      import('./features').then((c) => c.AdvancedSelectControlComponent),
  },
];
