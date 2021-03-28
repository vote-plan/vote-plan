import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectoratePrepareComponent } from './electorate-prepare.component';

describe('ElectoratePrepareComponent', () => {
  let component: ElectoratePrepareComponent;
  let fixture: ComponentFixture<ElectoratePrepareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElectoratePrepareComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectoratePrepareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
