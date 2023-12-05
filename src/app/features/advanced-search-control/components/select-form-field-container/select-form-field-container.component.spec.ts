import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectFormFieldContainerComponent } from './select-form-field-container.component';

describe('SelectFormFieldContainerComponent', () => {
  let component: SelectFormFieldContainerComponent;
  let fixture: ComponentFixture<SelectFormFieldContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectFormFieldContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelectFormFieldContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
