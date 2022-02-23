import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartiesElectorateComponent } from './parties-electorate.component';

describe('PartiesElectorateComponent', () => {
  let component: PartiesElectorateComponent;
  let fixture: ComponentFixture<PartiesElectorateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartiesElectorateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartiesElectorateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
