import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancedSelectControlComponent } from './advanced-select-control.component';

describe('AdvancedSelectControlComponent', () => {
  let component: AdvancedSelectControlComponent;
  let fixture: ComponentFixture<AdvancedSelectControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdvancedSelectControlComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdvancedSelectControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
