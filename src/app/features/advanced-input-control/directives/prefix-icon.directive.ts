import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appPrefixIcon]',
  standalone: true,
})
export class PrefixIconDirective {
  constructor(public template: TemplateRef<unknown>) {}
}
