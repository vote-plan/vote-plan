import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectionPrepareComponent } from './election-prepare.component';

describe('ElectionPrepareComponent', () => {
  let component: ElectionPrepareComponent;
  let fixture: ComponentFixture<ElectionPrepareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElectionPrepareComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectionPrepareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
