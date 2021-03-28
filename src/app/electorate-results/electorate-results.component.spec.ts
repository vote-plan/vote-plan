import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectorateResultsComponent } from './electorate-results.component';

describe('ElectorateResultsComponent', () => {
  let component: ElectorateResultsComponent;
  let fixture: ComponentFixture<ElectorateResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElectorateResultsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectorateResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
