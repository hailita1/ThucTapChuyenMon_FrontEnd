import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutDealsComponent } from './checkout-deals.component';

describe('CheckoutDealsComponent', () => {
  let component: CheckoutDealsComponent;
  let fixture: ComponentFixture<CheckoutDealsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckoutDealsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutDealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
