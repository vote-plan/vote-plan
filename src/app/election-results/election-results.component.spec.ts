import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectionResultsComponent } from './election-results.component';
import {AppRoutingModule} from '../app-routing.module';

describe('ElectionResultsComponent', () => {
  let component: ElectionResultsComponent;
  let fixture: ComponentFixture<ElectionResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElectionResultsComponent ], imports: [AppRoutingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectionResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
