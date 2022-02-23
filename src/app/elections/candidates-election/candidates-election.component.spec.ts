import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatesElectionComponent } from './candidates-election.component';

describe('CandidatesElectionComponent', () => {
  let component: CandidatesElectionComponent;
  let fixture: ComponentFixture<CandidatesElectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidatesElectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidatesElectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
