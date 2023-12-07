import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancedInputControlComponent } from './advanced-input-control.component';

describe('AdvancedInputControlComponent', () => {
  let component: AdvancedInputControlComponent;
  let fixture: ComponentFixture<AdvancedInputControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdvancedInputControlComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdvancedInputControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
