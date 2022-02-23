import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartiesElectionComponent } from './parties-election.component';

describe('PartiesElectionComponent', () => {
  let component: PartiesElectionComponent;
  let fixture: ComponentFixture<PartiesElectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartiesElectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartiesElectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
