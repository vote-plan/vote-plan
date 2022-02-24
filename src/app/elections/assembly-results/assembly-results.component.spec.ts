import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssemblyResultsComponent } from './assembly-results.component';

describe('AssemblyResultsComponent', () => {
  let component: AssemblyResultsComponent;
  let fixture: ComponentFixture<AssemblyResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssemblyResultsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssemblyResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
