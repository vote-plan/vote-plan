import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectoratePlanComponent } from './electorate-plan.component';

describe('ElectoratePlanComponent', () => {
  let component: ElectoratePlanComponent;
  let fixture: ComponentFixture<ElectoratePlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElectoratePlanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectoratePlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
