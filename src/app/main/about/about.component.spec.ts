import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutComponent } from './about.component';
import { Title } from '@angular/platform-browser';
import { TitleServiceStub } from '../../../testing/title-service-stub';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;

  const titleInitial = 'About | Vote Plan';
  const titleServiceStub = new TitleServiceStub('');

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AboutComponent],
      providers: [
        {provide: Title, useValue: titleServiceStub}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have expected title', () => {
    const titleService = TestBed.get(Title);
    expect(titleService.getTitle()).toBe(titleInitial);
  });
});
