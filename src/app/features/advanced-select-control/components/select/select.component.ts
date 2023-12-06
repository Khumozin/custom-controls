import { animate, AnimationEvent, state, style, transition, trigger } from '@angular/animations';
import { SelectionModel } from '@angular/cdk/collections';
import { OverlayModule } from '@angular/cdk/overlay';
import { NgClass } from '@angular/common';
import {
  AfterContentInit,
  Component,
  ContentChildren,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  Output,
  QueryList,
} from '@angular/core';
import { merge, startWith, Subject, switchMap, takeUntil } from 'rxjs';

import { OptionComponent } from '../option/option.component';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [NgClass, OverlayModule],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  animations: [
    trigger('dropDown', [
      state('void', style({ transform: 'scaleY(0)', opacity: 0 })),
      state('*', style({ transform: 'scaleY(1)', opacity: 1 })),
      transition(':enter', [animate('320ms cubic-bezier(0, 1, 0.45, 1.34)')]),
      transition(':leave', [
        animate('420ms cubic-bezier(0.88, -0.7, 0.86, 0.85)'),
      ]),
    ]),
  ],
})
export class SelectComponent implements AfterContentInit, OnDestroy {
  @Input()
  label = '';

  @Input()
  set value(value: string | null) {
    this.selectionModel.clear();

    if (value) {
      this.selectionModel.select(value);
    }
  }
  get value() {
    return this.selectionModel.selected[0] || null;
  }
  private selectionModel = new SelectionModel<string>();

  @Output()
  readonly opened = new EventEmitter<void>();

  @Output()
  readonly closed = new EventEmitter<void>();

  @Output()
  readonly selectionChanged = new EventEmitter<string | null>();

  @HostListener('click')
  open() {
    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
  }

  @ContentChildren(OptionComponent, { descendants: true })
  options!: QueryList<OptionComponent>;

  isOpen = false;

  private unsubscribe$ = new Subject<void>();

  ngAfterContentInit(): void {
    this.highlightSelectedOptions(this.value);

    this.selectionModel.changed
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((values) => {
        values.removed.forEach((rv) => this.findOptionsByValue(rv)?.deselect());
        values.added.forEach((av) => this.findOptionsByValue(av)?.highlightAsSelected());
      });

    this.options.changes
      .pipe(
        startWith<QueryList<OptionComponent>>(this.options),
        switchMap((options) => merge(...options.map((o) => o.selected))),
        takeUntil(this.unsubscribe$),
      )
      .subscribe({
        next: (selectedOption) => this.handleSelection(selectedOption),
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onPanelAnimationDone({ fromState, toState }: AnimationEvent) {
    if (fromState === 'void' && toState === null && this.isOpen) {
      this.opened.emit();
    }

    if (fromState === null && toState === 'void' && !this.isOpen) {
      this.closed.emit();
    }
  }

  private handleSelection(option: OptionComponent) {
    if (option.value) {
      this.selectionModel.toggle(option.value);
      this.selectionChanged.emit(this.value);
    }

    this.close();
  }

  private highlightSelectedOptions(value: string | null) {
    this.findOptionsByValue(value)?.highlightAsSelected();
  }

  private findOptionsByValue(value: string | null) {
    return this.options && this.options.find((o) => o.value == value);
  }
}
