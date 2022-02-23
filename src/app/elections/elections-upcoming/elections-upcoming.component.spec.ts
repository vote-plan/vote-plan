import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectionsUpcomingComponent } from './elections-upcoming.component';

describe('ElectionsUpcomingComponent', () => {
  let component: ElectionsUpcomingComponent;
  let fixture: ComponentFixture<ElectionsUpcomingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElectionsUpcomingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectionsUpcomingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
