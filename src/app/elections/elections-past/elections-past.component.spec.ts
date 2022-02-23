import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectionsPastComponent } from './elections-past.component';

describe('ElectionsPastComponent', () => {
  let component: ElectionsPastComponent;
  let fixture: ComponentFixture<ElectionsPastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElectionsPastComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectionsPastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
