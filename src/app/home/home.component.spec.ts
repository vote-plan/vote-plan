import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { Title } from '@angular/platform-browser';
import { TitleServiceStub } from '../../testing/title-service-stub';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  const titleInitial = 'Home | Vote Plan';
  const titleServiceStub = new TitleServiceStub('');

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [
        {provide: Title, useValue: titleServiceStub}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
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
