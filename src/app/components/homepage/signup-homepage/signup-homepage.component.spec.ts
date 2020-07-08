import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupHomepageComponent } from './signup-homepage.component';

describe('SignupHomepageComponent', () => {
  let component: SignupHomepageComponent;
  let fixture: ComponentFixture<SignupHomepageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupHomepageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
