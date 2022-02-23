import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatesAssemblyComponent } from './candidates-assembly.component';

describe('CandidatesAssemblyComponent', () => {
  let component: CandidatesAssemblyComponent;
  let fixture: ComponentFixture<CandidatesAssemblyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidatesAssemblyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidatesAssemblyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
