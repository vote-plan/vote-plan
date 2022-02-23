import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectorateComponent } from './electorate.component';

describe('ElectorateComponent', () => {
  let component: ElectorateComponent;
  let fixture: ComponentFixture<ElectorateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElectorateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectorateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
