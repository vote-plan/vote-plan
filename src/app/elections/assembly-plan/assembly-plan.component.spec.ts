import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssemblyPlanComponent } from './assembly-plan.component';

describe('AssemblyPlanComponent', () => {
  let component: AssemblyPlanComponent;
  let fixture: ComponentFixture<AssemblyPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssemblyPlanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssemblyPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
