import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatesPartyComponent } from './candidates-party.component';

describe('CandidatesPartyComponent', () => {
  let component: CandidatesPartyComponent;
  let fixture: ComponentFixture<CandidatesPartyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidatesPartyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidatesPartyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
