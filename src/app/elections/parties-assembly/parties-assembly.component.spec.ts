import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartiesAssemblyComponent } from './parties-assembly.component';

describe('PartiesAssemblyComponent', () => {
  let component: PartiesAssemblyComponent;
  let fixture: ComponentFixture<PartiesAssemblyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartiesAssemblyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartiesAssemblyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
