import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectorateDetailComponent } from './electorate-detail.component';

describe('ElectorateDetailComponent', () => {
  let component: ElectorateDetailComponent;
  let fixture: ComponentFixture<ElectorateDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElectorateDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectorateDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
