import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectoratesAssemblyComponent } from './electorates-assembly.component';

describe('ElectoratesAssemblyComponent', () => {
  let component: ElectoratesAssemblyComponent;
  let fixture: ComponentFixture<ElectoratesAssemblyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElectoratesAssemblyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectoratesAssemblyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
