import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectoratesElectionComponent } from './electorates-election.component';

describe('ElectoratesElectionComponent', () => {
  let component: ElectoratesElectionComponent;
  let fixture: ComponentFixture<ElectoratesElectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElectoratesElectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectoratesElectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
