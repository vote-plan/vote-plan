import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssembliesElectionComponent } from './assemblies-election.component';

describe('AssembliesElectionComponent', () => {
  let component: AssembliesElectionComponent;
  let fixture: ComponentFixture<AssembliesElectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssembliesElectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssembliesElectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
