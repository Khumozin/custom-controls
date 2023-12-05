import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import(
        './features/advanced-search-control/advanced-search-control.component'
      ).then((c) => c.AdvancedSearchControlComponent),
  },
];
