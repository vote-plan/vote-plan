import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatesElectorateComponent } from './candidates-electorate.component';

describe('CandidatesElectorateComponent', () => {
  let component: CandidatesElectorateComponent;
  let fixture: ComponentFixture<CandidatesElectorateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidatesElectorateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidatesElectorateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
