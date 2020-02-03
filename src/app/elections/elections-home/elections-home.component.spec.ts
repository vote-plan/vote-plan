import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectionsHomeComponent } from './elections-home.component';

describe('ElectionsHomeComponent', () => {
  let component: ElectionsHomeComponent;
  let fixture: ComponentFixture<ElectionsHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ElectionsHomeComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectionsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
