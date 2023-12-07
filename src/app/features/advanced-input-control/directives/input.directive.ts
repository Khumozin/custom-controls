import { Directive, ElementRef, Input, OnInit } from '@angular/core';

export type Appearance = 'standard' | 'outline';

@Directive({
  selector: 'div[appInput]',
  host: {
    class:
      'w-full h-10 flex transition-colors duration-100 ease-in',
  },
  standalone: true
})
export class InputDirective implements OnInit {
  @Input() appearance: Appearance = 'standard';

  constructor(private elRef: ElementRef<HTMLDivElement>) {}

  ngOnInit(): void {
    let cssClasses: string[] = [];

    if (this.appearance === 'standard') {
      cssClasses = [
        // 'px-2',
        // 'my-4',
        // 'border-b-[1px]',
        'border-gray-600',
        'focus:border-b-2',
      ];
    } else if (this.appearance === 'outline') {
      cssClasses = [
        'focus:ring-[#9E8A33]',
        'leading-none',
        'text-[0.90rem]',
        'rounded-md',
        // 'pr-6',
        // 'py-2',
        'border',
      ];
    }

    // if (this.appearance === 'outline' && this.multiControl) {
    //   cssClasses.push('pl-[72px]');
    // } else if (this.appearance === 'outline' && !this.multiControl) {
    //   cssClasses.push('pl-[10px]');
    // }

    this.elRef.nativeElement.classList.add(...cssClasses);
  }
}

