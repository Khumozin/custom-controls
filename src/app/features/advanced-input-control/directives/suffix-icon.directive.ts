import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appSuffixIcon]',
  standalone: true,
})
export class SuffixIconDirective {
  constructor(public template: TemplateRef<unknown>) {}
}
