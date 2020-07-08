import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyNewsComponent } from './body-news.component';

describe('BodyNewsComponent', () => {
  let component: BodyNewsComponent;
  let fixture: ComponentFixture<BodyNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BodyNewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BodyNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
