import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomFormFieldControlComponent } from './custom-form-field-control.component';

describe('CustomFormFieldControlComponent', () => {
  let component: CustomFormFieldControlComponent;
  let fixture: ComponentFixture<CustomFormFieldControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomFormFieldControlComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomFormFieldControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
